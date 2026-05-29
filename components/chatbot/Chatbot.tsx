"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { ChatWindow } from "@/components/chatbot/ChatWindow";
import type { ChatMessage, ChatbotResponse } from "@/types/chatbot";

const STORAGE_KEY = "sarj-chatbot-messages";
const COOLDOWN_SECONDS = 5;
const MAX_STORED_MESSAGES = 12;

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${crypto.randomUUID()}`,
    role,
    content,
    createdAt: Date.now(),
  };
}

function loadMessages() {
  if (typeof window === "undefined") return [];

  try {
    const storedMessages = window.localStorage.getItem(STORAGE_KEY);
    if (!storedMessages) return [];

    const parsed = JSON.parse(storedMessages) as ChatMessage[];
    return Array.isArray(parsed) ? parsed.slice(-MAX_STORED_MESSAGES) : [];
  } catch {
    return [];
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) return;

    const timer = window.setTimeout(() => {
      setShowNotification(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [messages.length]);

  useEffect(() => {
    if (cooldownRemaining <= 0) return;

    const timer = window.setTimeout(() => {
      setCooldownRemaining((currentValue) => Math.max(0, currentValue - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldownRemaining]);

  const visibleMessages = useMemo(() => messages.slice(-MAX_STORED_MESSAGES), [messages]);

  const clearChat = () => {
    setMessages([]);
    setError(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const sendMessage = async (content: string) => {
    if (isLoading || cooldownRemaining > 0) return;

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage].slice(-MAX_STORED_MESSAGES);

    setMessages(nextMessages);
    setIsLoading(true);
    setCooldownRemaining(COOLDOWN_SECONDS);
    setShowNotification(false);
    setError(null);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as Partial<ChatbotResponse> & { error?: string };

      if (!response.ok || !data.message) {
        throw new Error(data.error || "The assistant could not respond right now.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", data.message as string),
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while contacting the assistant."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showNotification && !isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-[70] w-[min(250px,calc(100vw-2rem))] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm shadow-[0_16px_50px_var(--shadow)] sm:right-6"
          >
            <button
              type="button"
              onClick={() => setShowNotification(false)}
              className="icon-action absolute right-2 top-2 h-7 w-7"
              aria-label="Dismiss assistant notification"
            >
              <X size={13} />
            </button>
            <div className="flex gap-2 pr-7">
              <Sparkles size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <div>
                <p className="font-semibold text-[var(--foreground)]">Recruiting Shean?</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Ask for project context, skills, goals, and learning journey.
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}

        {isOpen ? (
          <ChatWindow
            messages={visibleMessages}
            isLoading={isLoading}
            cooldownRemaining={cooldownRemaining}
            error={error}
            onClose={() => setIsOpen(false)}
            onClear={clearChat}
            onSend={sendMessage}
          />
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => {
          setIsOpen((value) => !value);
          setShowNotification(false);
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_16px_50px_var(--shadow)] transition hover:border-[var(--accent)] sm:right-6"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
      >
        <MessageCircle size={20} />
        {!isOpen && messages.length === 0 ? (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[var(--accent)] ring-2 ring-[var(--surface)]" />
        ) : null}
      </motion.button>
    </>
  );
}
