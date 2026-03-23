import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { NextRequest } from "next/server";

const anthropic = new Anthropic();

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 50;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
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

    const anthropicMessages = messages.map(
      (msg: {
        role: string;
        content: string;
        image?: { type: string; data: string; mediaType: string };
      }) => {
        if (msg.image) {
          const contentParts: Anthropic.MessageCreateParams["messages"][0]["content"] =
            [
              {
                type: "image" as const,
                source: {
                  type: "base64" as const,
                  media_type: msg.image.mediaType as
                    | "image/jpeg"
                    | "image/png"
                    | "image/gif"
                    | "image/webp",
                  data: msg.image.data,
                },
              },
            ];
          if (msg.content) {
            contentParts.push({ type: "text" as const, text: msg.content });
          }
          return {
            role: msg.role as "user" | "assistant",
            content: contentParts,
          };
        }
        return {
          role: msg.role as "user" | "assistant",
          content: msg.content,
        };
      }
    );

    const systemPrompt = buildSystemPrompt();

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(chunk));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Stream error";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: errorMessage })}\n\n`
            )
          );
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
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
