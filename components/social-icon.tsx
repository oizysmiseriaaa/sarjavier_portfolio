"use client";

import { GitBranch, Link2, Mail, Network } from "lucide-react";
import type { SocialLink } from "@/types/project";
import { cn } from "@/lib/utils";

const icons = {
  GitBranch,
  Link2,
  Mail,
  Network,
};

export function SocialIcon({ social, compact = false }: { social: SocialLink; compact?: boolean }) {
  const Icon = icons[social.icon as keyof typeof icons] ?? Mail;

  return (
    <a
      href={social.href}
      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
      rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      aria-label={social.label}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full transition duration-300 hover:-translate-y-0.5",
        "border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]",
        social.priority && "text-[var(--foreground)]",
        compact ? "h-10 w-10" : "h-10 px-4"
      )}
    >
      <Icon size={compact ? 18 : 17} aria-hidden="true" />
      {!compact ? <span className="text-sm font-medium">{social.label}</span> : null}
    </a>
  );
}
