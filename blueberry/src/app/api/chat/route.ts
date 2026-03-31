import Anthropic from "@anthropic-ai/sdk";
import {
  buildSystemPrompt,
  buildInventoryPrompt,
  buildGlossaryPrompt,
  buildWritingRulesPrompt,
  buildAccessibilityPrompt,
  buildReportPrompt,
  buildRescanPrompt,
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

            sendChunk(controller, { text: "## Step 1: Content Inventory and Classification\n\n" + inventory + "\n\n---\n\n" });

            // ----- CHUNK 2: Glossary & Formatting -----
            sendChunk(controller, { status: "Scanning glossary and formatting rules..." });

            const glossaryResult = await callClaude(
              buildGlossaryPrompt(),
              [
                { role: "user" as const, content: `Here is the content inventory to check:\n\n${inventory}\n\nCheck every inventory item against every glossary, formatting, and term distinction rule. Be thorough — check each item word by word.` },
              ],
              4096
            );

            sendChunk(controller, { text: "## Step 2: Glossary, Formatting, and Term Distinctions\n\n" + glossaryResult + "\n\n---\n\n" });

            // ----- CHUNK 3: Writing Rules & Principles -----
            sendChunk(controller, { status: "Checking writing rules and principles..." });

            const writingResult = await callClaude(
              buildWritingRulesPrompt(),
              [
                { role: "user" as const, content: `Here is the content inventory to check:\n\n${inventory}\n\nCheck every inventory item against every writing rule, principle, voice/tone rule, and content purpose rule. Be thorough.` },
              ],
              4096
            );

            sendChunk(controller, { text: "## Step 3: Writing Rules and Principles\n\n" + writingResult + "\n\n---\n\n" });

            // ----- CHUNK 4: Accessibility & Components -----
            sendChunk(controller, { status: "Checking accessibility and component rules..." });

            const accessibilityResult = await callClaude(
              buildAccessibilityPrompt(),
              [
                { role: "user" as const, content: `Here is the content inventory to check:\n\n${inventory}\n\nCheck every inventory item against every accessibility, inclusion, and component-specific rule.` },
              ],
              4096
            );

            sendChunk(controller, { text: "## Step 4: Accessibility, Inclusion, and Components\n\n" + accessibilityResult + "\n\n---\n\n" });

            // ----- CHUNK 5: Final Report -----
            sendChunk(controller, { status: "Compiling final report and rewrite..." });

            const reportResult = await callClaude(
              buildReportPrompt(),
              [
                {
                  role: "user" as const,
                  content: `Here is the complete review to compile into a final report:

## Content Inventory
${inventory}

## Glossary & Formatting Findings
${glossaryResult}

## Writing Rules & Principles Findings
${writingResult}

## Accessibility & Component Findings
${accessibilityResult}

Compile ALL issues found above into the final report. Include every issue — do not drop any. Group by severity, provide the compliance matrix, the clean rewrite with all fixes applied, and the final verdict.`,
                },
              ],
              8192
            );

            sendChunk(controller, { text: reportResult + "\n\n---\n\n" });

            // ----- CHUNK 6: Pass 2 Re-scan (streamed) -----
            sendChunk(controller, { status: "Running Pass 2 re-scan and rewrite validation..." });

            const rescanStream = await anthropic.messages.stream({
              model: "claude-sonnet-4-20250514",
              max_tokens: 4096,
              system: buildRescanPrompt(),
              messages: [
                {
                  role: "user" as const,
                  content: `Here is the original content inventory and the clean rewrite from the report. Re-scan both for missed issues.

## Original Content Inventory
${inventory}

## Report with Clean Rewrite
${reportResult}

Run every P2.1-P2.17 re-scan check against the original inventory. Then validate the rewrite doesn't introduce new violations. Be thorough — this is the final quality gate.`,
                },
              ],
            });

            for await (const event of rescanStream) {
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
