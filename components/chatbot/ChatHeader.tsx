"use client";

import { Bot, Trash2, X } from "lucide-react";

type ChatHeaderProps = {
  onClose: () => void;
  onClear: () => void;
};

export function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="icon-action h-9 w-9 rounded-full">
          <Bot size={18} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[var(--foreground)]">AI Assistant</h2>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={onClear} className="icon-action h-9 w-9" aria-label="Clear chat">
          <Trash2 size={16} />
        </button>
        <button type="button" onClick={onClose} className="icon-action h-9 w-9" aria-label="Close chat">
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
