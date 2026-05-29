"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
  disabled: boolean;
  cooldownRemaining: number;
  onSend: (message: string) => void;
};

export function ChatInput({ disabled, cooldownRemaining, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");
  const isCoolingDown = cooldownRemaining > 0;
  const isDisabled = disabled || isCoolingDown;

  const sendMessage = () => {
    const message = value.trim();
    if (!message || isDisabled) return;

    onSend(message);
    setValue("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[var(--border)] p-3">
      <div className="flex items-end gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-2">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isDisabled}
          placeholder={isCoolingDown ? `Wait ${cooldownRemaining}s...` : "Ask about Shean's work..."}
          className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-6 text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] disabled:opacity-60"
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={isDisabled || !value.trim()}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_10px_24px_var(--accent-soft)] transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-elevated)] disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:bg-[var(--surface)] disabled:text-[var(--muted)] disabled:opacity-60 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100"
          aria-label="Send message"
          title="Send message"
        >
          <Send size={18} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
