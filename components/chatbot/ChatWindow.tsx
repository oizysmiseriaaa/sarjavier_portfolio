"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatHeader } from "@/components/chatbot/ChatHeader";
import { ChatInput } from "@/components/chatbot/ChatInput";
import { ChatMessage } from "@/components/chatbot/ChatMessage";
import { SuggestedQuestions } from "@/components/chatbot/SuggestedQuestions";
import type { ChatMessage as ChatMessageType } from "@/types/chatbot";

type ChatWindowProps = {
  messages: ChatMessageType[];
  isLoading: boolean;
  cooldownRemaining: number;
  error: string | null;
  onClose: () => void;
  onClear: () => void;
  onSend: (message: string) => void;
};

export function ChatWindow({
  messages,
  isLoading,
  cooldownRemaining,
  error,
  onClose,
  onClear,
  onSend,
}: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, error]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-[70] flex h-[min(650px,calc(100dvh-7rem))] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_90px_var(--shadow)] sm:right-6"
      role="dialog"
      aria-label="AI portfolio assistant"
    >
      <ChatHeader onClose={onClose} onClear={onClear} />

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">Hi, I am Shean&apos;s portfolio assistant.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Ask me for deeper context about her projects, goals, learning journey, and interests.
              </p>
            </div>
            <SuggestedQuestions disabled={isLoading || cooldownRemaining > 0} onSelect={onSend} />
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} message={message} />)
        )}

        {isLoading ? (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)] [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted)] [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm leading-6 text-red-300">
            {error}
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <ChatInput disabled={isLoading} cooldownRemaining={cooldownRemaining} onSend={onSend} />
    </motion.section>
  );
}
