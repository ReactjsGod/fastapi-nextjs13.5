"use client";

import React from "react";
import { useTheme } from "@Providers";
import { BsSun, BsMoon } from "react-icons/bs";

interface ThemeInterface {
    scrolled: boolean;
}

const ThemeController = ({ scrolled }:ThemeInterface) => {
  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error("Sorry no theme available");
  }

  const { theme, toggleTheme } = themeContext;
  return (
    <button
      onClick={toggleTheme}
      className={`flex active:translate-y-2 duration-300 ease-in-out gap-3 justify-center border rounded-full p-1 shadow-gray-300 shadow-lg bg-transparent ${
        scrolled && theme === "light" ? "border-black" : "border-white"
      }`}
    >
      {theme === "light" ? (
        <BsSun className={`${scrolled && "text-black"}`} />
      ) : (
        <BsMoon />
      )}
    </button>
  );
};

export default ThemeController;
