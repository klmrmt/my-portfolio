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

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div className="flex items-center gap-1 border-2 border-[var(--border)] bg-[var(--surface-primary)] p-1 shadow-[4px_4px_0px_var(--shadow-color)] backdrop-blur-sm">
        {(["system", "light", "dark"] as const).map((option) => {
          const isActive = preference === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setThemePreference(option)}
              className={`px-3 py-1.5 text-xs font-semibold capitalize transition-colors duration-150 ease-out ${
                isActive
                  ? "bg-[var(--surface-inverse)] text-[var(--text-inverse)]"
                  : "bg-[var(--surface-primary)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
              }`}
              aria-pressed={isActive}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
