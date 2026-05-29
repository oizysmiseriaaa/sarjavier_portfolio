"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems, owner } from "@/lib/constants";
import { cn, scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const current = navItems.findLast(({ id }) => {
        const element = document.getElementById(id);
        return element ? element.getBoundingClientRect().top <= 130 : false;
      });
      if (current) setActive(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const select = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-[var(--accent)]"
        style={{ scaleX }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_82%,transparent)] shadow-xl backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => select("home")}
            className="flex items-center gap-4 rounded-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Go to home"
          >
            <Image src={owner.logo} alt="SARJ logo" width={56} height={56} className="h-14 w-14 rounded-full object-cover" priority />
            <span className="hidden text-base font-semibold tracking-[0.18em] text-[var(--foreground)] sm:inline">
              SARJ
            </span>
          </button>

          <div className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 backdrop-blur md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => select(item.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === item.id ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {active === item.id ? (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-full bg-[var(--accent-soft)]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>

          <a
            href={owner.resume}
            download
            className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] lg:inline-flex"
          >
            Download Resume
          </a>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => select(item.id)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-left text-sm font-medium",
                      active === item.id ? "bg-[var(--accent-soft)] text-[var(--foreground)]" : "text-[var(--muted)]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-1 pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
