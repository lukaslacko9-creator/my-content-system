"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/use-chat";
import { ChatInput } from "@/components/chat-input";
import { ChatMessageBubble } from "@/components/chat-message";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { messages, isStreaming, error, sendMessage, clearMessages } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <button
          onClick={clearMessages}
          className="flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          <img src="/Blueberry-logo.png" alt="Blueberry" className="h-8 w-8 object-contain" />
          <div className="text-left">
            <h1 className="text-sm font-semibold tracking-tight">Blueberry</h1>
            <p className="text-xs text-muted-foreground">
              CE content design assistant
            </p>
          </div>
        </button>
        <div className="flex items-center gap-3">
          {hasMessages && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-xs text-muted-foreground"
            >
              New chat
            </Button>
          )}
          <img
            src="/tesco-logo.png"
            alt="Tesco"
            className="h-10 object-contain sm:h-14"
          />
        </div>
      </header>

      {/* Main content area — vertically centered when empty */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {!hasMessages ? (
          /* Empty state: centered vertically and horizontally */
          <div className="flex flex-1 flex-col items-center justify-center px-4">
            <div className="mb-6">
              <img src="/Blueberry-logo.png" alt="Blueberry" className="h-16 w-16 object-contain" />
            </div>
            <h2 className="mb-2 text-center text-lg font-semibold">
              Check, create or transcreate English content for CE
            </h2>
            <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
              Check copy against Blueberry rules, create new content
              or transcreate from Slovak, Czech and Hungarian.
            </p>

            {/* Chat input centered */}
            <div className="w-full max-w-2xl">
              <ChatInput onSend={sendMessage} disabled={isStreaming} minimal />
            </div>

            {/* Suggestions below input */}
            <div className="mt-6 w-full max-w-2xl">
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Suggestions
              </p>
              <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
                <SuggestionCard
                  onClick={() =>
                    sendMessage(
                      'Check this button copy: "Click here to login to your Profile"'
                    )
                  }
                  label="Check a button"
                  example="&quot;Click here to login to your Profile&quot;"
                />
                <SuggestionCard
                  onClick={() =>
                    sendMessage(
                      "Create an error message for when a payment card is declined at checkout"
                    )
                  }
                  label="Create an error"
                  example="Payment card declined at checkout"
                />
                <SuggestionCard
                  onClick={() =>
                    sendMessage(
                      "Create a success message for when a customer books a delivery slot"
                    )
                  }
                  label="Create a success"
                  example="Delivery slot booked"
                />
                <SuggestionCard
                  onClick={() =>
                    sendMessage(
                      'Transcreate this Slovak button copy to English: "Kliknite sem pre prihlásenie do vášho profilu"'
                    )
                  }
                  label="Transcreate from CE"
                  example="Slovak, Czech, or Hungarian to English"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Chat messages with input pinned to bottom */
          <>
            <div className="flex-1 overflow-y-auto" ref={scrollRef}>
              <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <ChatMessageBubble key={msg.id} message={msg} />
                  ))}
                  {isStreaming &&
                    messages[messages.length - 1]?.role === "assistant" &&
                    !messages[messages.length - 1]?.content && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl bg-muted/50 px-4 py-3">
                          <div className="flex gap-1">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50" />
                            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                            <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                {error && (
                  <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <ChatInput onSend={sendMessage} disabled={isStreaming} />
          </>
        )}
      </div>
    </div>
  );
}

function SuggestionCard({
  onClick,
  label,
  example,
}: {
  onClick: () => void;
  label: string;
  example: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:bg-accent"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span
        className="text-xs leading-relaxed text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: example }}
      />
    </button>
  );
}
