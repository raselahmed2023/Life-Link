"use client";

import {
  Moon,
  Sun,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] =
    useState<Theme>("light");

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "lifelink_theme"
      ) as Theme | null;

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    const initialTheme: Theme =
      savedTheme ||
      (prefersDark
        ? "dark"
        : "light");

    setTheme(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    localStorage.setItem(
      "lifelink_theme",
      newTheme
    );

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-10 w-10"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        theme === "dark"
          ? "Light mode"
          : "Dark mode"
      }
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-[#910102] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
    >
      {theme === "dark" ? (
        <Sun
          size={19}
          className="transition duration-300 group-hover:rotate-45"
        />
      ) : (
        <Moon
          size={19}
          className="transition duration-300 group-hover:-rotate-12"
        />
      )}
    </button>
  );
}