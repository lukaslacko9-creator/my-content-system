"use client";

import { useState } from "react";
import type { ChatMessage } from "@/lib/hooks/use-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function renderContent(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const inner = part.slice(3, -3);
      const newlineIdx = inner.indexOf("\n");
      const code = newlineIdx >= 0 ? inner.slice(newlineIdx + 1) : inner;
      return (
        <div key={i} className="group relative my-3">
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
            <code>{code}</code>
          </pre>
          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            <CopyButton text={code} />
          </div>
        </div>
      );
    }

    return part.split("\n").map((line, j) => {
      const key = `${i}-${j}`;

      if (line.startsWith("### ")) {
        return (
          <h3 key={key} className="mb-2 mt-5 text-sm font-semibold text-foreground">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={key} className="mb-2 mt-6 text-base font-semibold text-foreground">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={key} className="mb-3 mt-6 text-lg font-bold text-foreground">
            {line.slice(2)}
          </h1>
        );
      }

      // Severity badges
      if (line.includes("🔴 **Critical**") || line.includes("🔴 Critical")) {
        return (
          <div key={key} className="my-2 flex items-start gap-2">
            <Badge variant="destructive" className="mt-0.5 shrink-0 text-xs">
              Critical
            </Badge>
            <span className="text-sm">{renderInlineMarkdown(line.replace(/🔴\s*\*?\*?Critical\*?\*?\s*[—–-]?\s*/, ""))}</span>
          </div>
        );
      }
      if (line.includes("🟡 **Important**") || line.includes("🟡 Important")) {
        return (
          <div key={key} className="my-2 flex items-start gap-2">
            <Badge className="mt-0.5 shrink-0 bg-amber-600 text-xs hover:bg-amber-600">
              Important
            </Badge>
            <span className="text-sm">{renderInlineMarkdown(line.replace(/🟡\s*\*?\*?Important\*?\*?\s*[—–-]?\s*/, ""))}</span>
          </div>
        );
      }
      if (line.includes("🔵 **Style**") || line.includes("🔵 Style")) {
        return (
          <div key={key} className="my-2 flex items-start gap-2">
            <Badge variant="secondary" className="mt-0.5 shrink-0 text-xs">
              Style
            </Badge>
            <span className="text-sm">{renderInlineMarkdown(line.replace(/🔵\s*\*?\*?Style\*?\*?\s*[—–-]?\s*/, ""))}</span>
          </div>
        );
      }

      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={key} className="ml-4 text-sm leading-relaxed list-disc">
            {renderInlineMarkdown(line.slice(2))}
          </li>
        );
      }

      if (line.trim() === "") {
        return <div key={key} className="h-2" />;
      }

      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={key}
            className="my-2 border-l-2 border-muted-foreground/30 pl-3 text-sm italic text-muted-foreground"
          >
            {renderInlineMarkdown(line.slice(2))}
          </blockquote>
        );
      }

      if (line.startsWith("---")) {
        return <hr key={key} className="my-4 border-border" />;
      }

      return (
        <p key={key} className="text-sm leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  });
}

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50 text-foreground"
        }`}
      >
        {message.imagePreview && (
          <img
            src={message.imagePreview}
            alt="Uploaded screenshot"
            className="mb-2 max-h-64 rounded-lg object-contain"
          />
        )}
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose-sm">{renderContent(message.content)}</div>
        )}
        {!isUser && message.content && (
          <div className="mt-2 flex justify-end border-t border-border/50 pt-2">
            <CopyButton text={message.content} />
          </div>
        )}
      </div>
    </div>
  );
}
