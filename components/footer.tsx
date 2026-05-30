"use client";

import { ArrowUp } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";
import { navItems, owner } from "@/lib/constants";
import { socials } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">{owner.name}</h2>
            <p className="mt-3 max-w-md leading-7 text-[var(--muted)]">
              Building modern digital solutions through technology and continuous learning.
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--accent)]">
              Open to internship and entry-level opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Quick Links</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Connect</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => (
                <SocialIcon key={social.label} social={social} compact />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-7 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Shean Anika Rojo Javier. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js and Tailwind CSS</span>
            <button
              onClick={() => scrollToSection("home")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
