"use client";
import React from "react";
import { useTheme } from "./ThemeProvider";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-2 px-2 py-1 rounded-md border border-border-color bg-gray-900 hover:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-accent transition"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggleButton;
