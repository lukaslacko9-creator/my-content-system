import Anthropic from "@anthropic-ai/sdk";
import {
  buildSystemPrompt,
  buildInventoryPrompt,
  buildGlossaryPrompt,
  buildWritingRulesPrompt,
  buildAccessibilityPrompt,
  buildReportPrompt,
  buildRescanPrompt,
  BLUEBERRY_PERSONALITY,
} from "@/lib/system-prompt";
import { NextRequest } from "next/server";

// Allow up to 300 seconds for the multi-call chain (5 sequential API calls)
export const maxDuration = 300;

const anthropic = new Anthropic();

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 50;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Helper: single Claude API call (non-streaming), returns text
async function callClaude(
  system: string,
  messages: Anthropic.MessageCreateParams["messages"],
  maxTokens = 4096
): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: maxTokens,
    system,
    messages,
  });
  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
}

// Detect if the user is requesting a content check (screenshot or copy paste)
function isCheckMode(messages: Array<{ role: string; content: string; image?: unknown }>): boolean {
  const lastUser = messages.filter((m) => m.role === "user").pop();
  if (!lastUser) return false;
  // If there's an image, it's almost certainly a check request
  if (lastUser.image) return true;
  // Only trigger CHECK mode for explicit check/review/audit requests
  // NOT for "rewrite", "rules" alone — those could be CREATE requests
  const text = lastUser.content.toLowerCase();
  const checkPhrases = [
    "check this", "check the", "check my", "check copy", "check against",
    "review this", "review the", "review my", "review copy",
    "audit this", "audit the", "audit my",
  ];
  return checkPhrases.some((phrase) => text.includes(phrase));
}

// Build Anthropic message format (with optional image)
function buildUserMessage(
  content: string,
  image?: { type: string; data: string; mediaType: string }
): Anthropic.MessageCreateParams["messages"][0] {
  if (image) {
    const parts: Anthropic.MessageCreateParams["messages"][0]["content"] = [
      {
        type: "image" as const,
        source: {
          type: "base64" as const,
          media_type: image.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
          data: image.data,
        },
      },
    ];
    if (content) parts.push({ type: "text" as const, text: content });
    return { role: "user" as const, content: parts };
  }
  return { role: "user" as const, content };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request format." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const encoder = new TextEncoder();

    // Helper to send SSE chunks
    function sendChunk(
      controller: ReadableStreamDefaultController,
      data: { text?: string; status?: string }
    ) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
      );
    }

    // Determine if this is CHECK mode
    const lastUserMsg = messages.filter((m: { role: string }) => m.role === "user").pop();
    const useChunkedCheck = isCheckMode(messages);

    if (useChunkedCheck) {
      // ===== CHUNKED CHECK MODE =====
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            const userContent = lastUserMsg.content || "";
            const userImage = lastUserMsg.image;

            // ----- CHUNK 1: Inventory -----
            sendChunk(controller, { status: "Extracting content inventory..." });

            const inventoryMsg = buildUserMessage(
              userContent || "Extract the content inventory from this screenshot.",
              userImage
            );
            const inventory = await callClaude(
              buildInventoryPrompt(),
              [inventoryMsg],
              4096
            );

            // Inventory stays hidden — only used as context for subsequent chunks

            // ----- CHUNK 2: Glossary & Formatting -----
            sendChunk(controller, { status: "Scanning glossary and formatting rules..." });

            const glossaryResult = await callClaude(
              buildGlossaryPrompt(),
              [
                { role: "user" as const, content: `Here is the content inventory to check:\n\n${inventory}\n\nCheck every inventory item against every glossary, formatting, and term distinction rule. Be thorough — check each item word by word.` },
              ],
              4096
            );

            // ----- CHUNK 3: Writing Rules & Principles -----
            sendChunk(controller, { status: "Checking writing rules and principles..." });

            const writingResult = await callClaude(
              buildWritingRulesPrompt(),
              [
                { role: "user" as const, content: `Here is the content inventory to check:\n\n${inventory}\n\nCheck every inventory item against every writing rule, principle, voice/tone rule, and content purpose rule. Be thorough.` },
              ],
              4096
            );

            // ----- CHUNK 4: Accessibility & Components -----
            sendChunk(controller, { status: "Checking accessibility and component rules..." });

            const accessibilityResult = await callClaude(
              buildAccessibilityPrompt(),
              [
                { role: "user" as const, content: `Here is the content inventory to check:\n\n${inventory}\n\nCheck every inventory item against every accessibility, inclusion, and component-specific rule.` },
              ],
              4096
            );

            // ----- CHUNK 5: Final Output (streamed) -----
            // Single call: takes raw findings from chunks 2-4 and produces user-friendly output
            // No intermediate report/rescan steps — direct from findings to presentation
            sendChunk(controller, { status: "Compiling results..." });

            const finalStream = await anthropic.messages.stream({
              model: "claude-sonnet-4-20250514",
              max_tokens: 8192,
              system: `${BLUEBERRY_PERSONALITY}

You are compiling the results of a thorough content review into a clean, actionable report for a content designer.

You will receive:
1. A content inventory (every piece of text extracted from the screenshot/copy)
2. Raw findings from 3 review passes (glossary, writing rules, accessibility)

Your job: compile ALL issues from ALL passes into a single clear output. Do NOT drop any issues. If two passes flagged the same thing, mention it once.

## MANDATORY TERM REPLACEMENTS

Before writing the rewrite, apply ALL of these — even if the review passes missed some:
- "home delivery" → "delivery" (ALWAYS — "home" is redundant, delivery means to your home)
- "unlock" → "get" or "start" (ALWAYS — marketing/gaming speak, not how people talk)
- "fees" → "charges" (ALWAYS — Tesco glossary rule 9A.7)
- "2x" or "2×" or "2x more" → "double" (ALWAYS — no math symbols, use plain English)
- "3x" or "3×" → "triple" (ALWAYS — no math symbols)
- "log in" / "log out" → "sign in" / "sign out" (ALWAYS)
- "click" or "tap" → "select" (ALWAYS)
- Fix any Title Case to sentence case
- Fix any inconsistent currency formats

After applying all fixes, re-read the rewrite and verify NONE of these terms remain.

## OUTPUT FORMAT

Structure your output EXACTLY as:

### Issues found

For each issue:
- The problematic text (quoted, with element # from inventory)
- The rule it breaks (rule number and name)
- Why it matters (1 sentence)
- The fix

Group by severity:
- **Critical** — must fix (accessibility, inclusive language)
- **Important** — should fix (principles, tone, component structure)
- **Style** — nice to fix (glossary, formatting, redundant words)

### Full rewrite

The complete rewritten content with ALL issues fixed. Use a code block. Every mandatory term replacement must be applied.

### Summary

2-3 sentences on what changed and why.

Keep it concise. No compliance matrices, no PASS/ISSUE checklists, no step numbers.`,
              messages: [
                {
                  role: "user" as const,
                  content: `Here is the content inventory and all findings from 3 review passes. Compile into a clean report with all issues and a complete rewrite.

## CONTENT INVENTORY
${inventory}

## PASS 1: GLOSSARY & FORMATTING FINDINGS
${glossaryResult}

## PASS 2: WRITING RULES & PRINCIPLES FINDINGS
${writingResult}

## PASS 3: ACCESSIBILITY & COMPONENT FINDINGS
${accessibilityResult}

IMPORTANT: Include EVERY issue found across all 3 passes. Apply EVERY mandatory term replacement to the rewrite. Re-read the rewrite before outputting to verify no forbidden terms remain (especially "home delivery", "unlock", "fees", "2x").`,
                },
              ],
            });

            for await (const event of finalStream) {
              if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
              ) {
                sendChunk(controller, { text: event.delta.text });
              }
            }

            sendChunk(controller, { text: "\n" });
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Review error";
            sendChunk(controller, { text: `\n\n**Error during review:** ${msg}` });
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      // ===== SINGLE-CALL MODE (CREATE, questions) =====
      const anthropicMessages = messages.map(
        (msg: { role: string; content: string; image?: { type: string; data: string; mediaType: string } }) => {
          if (msg.image) {
            const contentParts: Anthropic.MessageCreateParams["messages"][0]["content"] = [
              {
                type: "image" as const,
                source: {
                  type: "base64" as const,
                  media_type: msg.image.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
                  data: msg.image.data,
                },
              },
            ];
            if (msg.content) contentParts.push({ type: "text" as const, text: msg.content });
            return { role: msg.role as "user" | "assistant", content: contentParts };
          }
          return { role: msg.role as "user" | "assistant", content: msg.content };
        }
      );

      const stream = await anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system: buildSystemPrompt(),
        messages: anthropicMessages,
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
              ) {
                sendChunk(controller, { text: event.delta.text });
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Stream error";
            sendChunk(controller, { text: `\n\n**Error:** ${msg}` });
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
