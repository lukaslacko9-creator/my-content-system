"use client";

import { useState, useRef, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (
    content: string,
    image?: { type: string; data: string; mediaType: string; preview: string }
  ) => void;
  disabled?: boolean;
  minimal?: boolean;
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export function ChatInput({ onSend, disabled, minimal }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<{
    type: string;
    data: string;
    mediaType: string;
    preview: string;
    name: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const processFile = useCallback((file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image must be under 10MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Only image files are supported");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64 = result.split(",")[1];
      setImage({
        type: "image",
        data: base64,
        mediaType: file.type,
        preview: result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed && !image) return;

    const content = trimmed || (image ? "Check this screenshot" : "");
    onSend(
      content,
      image
        ? {
            type: image.type,
            data: image.data,
            mediaType: image.mediaType,
            preview: image.preview,
          }
        : undefined
    );
    setInput("");
    setImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) processFile(file);
        return;
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div className={minimal ? "p-0" : "border-t border-border bg-background p-4"}>
      <div
        className="mx-auto max-w-3xl"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {image && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-2">
            <img
              src={image.preview}
              alt="Upload preview"
              className="h-16 w-16 rounded object-cover"
            />
            <span className="flex-1 truncate text-sm text-muted-foreground">
              {image.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setImage(null)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              &times;
            </Button>
          </div>
        )}
        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
              e.target.value = "";
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="h-10 w-10 shrink-0 p-0 text-muted-foreground hover:text-foreground"
            title="Upload screenshot"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder=""
            disabled={disabled}
            rows={1}
            className="min-h-[44px] max-h-[200px] resize-none border-border bg-muted/30 focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button
            onClick={handleSubmit}
            disabled={disabled || (!input.trim() && !image)}
            size="sm"
            className="h-10 w-10 shrink-0 p-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
