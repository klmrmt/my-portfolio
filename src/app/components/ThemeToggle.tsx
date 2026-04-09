"use client";

import { useEffect, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "theme-preference";
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

function resolveTheme(preference: ThemePreference) {
  if (preference === "system") {
    return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
  }

  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = preference;
  window.localStorage.setItem(STORAGE_KEY, preference);
}

function getStoredPreference(): ThemePreference {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const initialPreference = getStoredPreference();
    setPreference(initialPreference);
    applyTheme(initialPreference);

    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    const handleSystemThemeChange = () => {
      if (getStoredPreference() === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const setThemePreference = (nextPreference: ThemePreference) => {
    setPreference(nextPreference);
    applyTheme(nextPreference);
  };

  const CYCLE: ThemePreference[] = ["system", "light", "dark"];
  const nextPreference = CYCLE[(CYCLE.indexOf(preference) + 1) % CYCLE.length];

  const icon =
    preference === "light" ? (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="9" r="3.5" />
        <line x1="9" y1="1" x2="9" y2="3" />
        <line x1="9" y1="15" x2="9" y2="17" />
        <line x1="1" y1="9" x2="3" y2="9" />
        <line x1="15" y1="9" x2="17" y2="9" />
        <line x1="3.34" y1="3.34" x2="4.75" y2="4.75" />
        <line x1="13.25" y1="13.25" x2="14.66" y2="14.66" />
        <line x1="3.34" y1="14.66" x2="4.75" y2="13.25" />
        <line x1="13.25" y1="4.75" x2="14.66" y2="3.34" />
      </svg>
    ) : preference === "dark" ? (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 9.7A7 7 0 1 1 8.3 2.5a5.5 5.5 0 0 0 7.2 7.2Z" />
      </svg>
    ) : (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="14" height="10" rx="1" />
        <line x1="6" y1="16" x2="12" y2="16" />
        <line x1="9" y1="13" x2="9" y2="16" />
      </svg>
    );

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        type="button"
        onClick={() => setThemePreference(nextPreference)}
        title={`Theme: ${preference}`}
        aria-label={`Theme: ${preference}. Click for ${nextPreference}`}
        className="border-2 border-[var(--border)] bg-[var(--surface-primary)] p-2 text-[var(--text-primary)] shadow-[4px_4px_0px_var(--shadow-color)] backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-[var(--surface-secondary)]"
      >
        {icon}
      </button>
    </div>
  );
}
