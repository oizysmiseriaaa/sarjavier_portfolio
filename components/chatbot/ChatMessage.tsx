"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chatbot";

type ChatMessageProps = {
  message: ChatMessageType;
};

function formatTime(createdAt: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(createdAt);
}

function renderFormattedText(text: string) {
  return text.split("\n").map((line, lineIndex) => {
    const trimmedLine = line.trim();
    const isBullet = trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ");
    const content = isBullet ? trimmedLine.replace(/^[-*]\s+/, "") : line;
    const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);

    const parsed = parts.map((part, partIndex) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIndex} className="font-semibold text-[var(--foreground)]">
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={partIndex}
            className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.8em]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });

    if (isBullet) {
      return (
        <li key={lineIndex} className="ml-4 list-disc">
          {parsed}
        </li>
      );
    }

    return (
      <p key={lineIndex} className={trimmedLine ? "" : "h-3"}>
        {parsed}
      </p>
    );
  });
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "bg-[var(--button-background)] text-[var(--button-foreground)]"
            : "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]"
        }`}
      >
        <div className="space-y-1 whitespace-pre-wrap">
          {isUser ? message.content : renderFormattedText(message.content)}
        </div>
        <div
          className={`mt-2 text-right text-[10px] uppercase tracking-wide ${
            isUser ? "text-[var(--button-foreground)]/70" : "text-[var(--muted)]"
          }`}
        >
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}
