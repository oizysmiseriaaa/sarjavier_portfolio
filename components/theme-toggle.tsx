"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const themeEvent = "portfolio-theme-change";

function readStoredTheme(): Theme {
  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getThemeSnapshot(): Theme {
  const activeTheme = document.documentElement.dataset.theme;
  if (activeTheme === "light" || activeTheme === "dark") return activeTheme;

  return readStoredTheme();
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function subscribeToThemeChanges(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(themeEvent));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      applyTheme(readStoredTheme());
    }
  }, []);

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      suppressHydrationWarning
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
