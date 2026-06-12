"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useThemeHook = () => {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
        
        setTheme(initialTheme);

        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (!theme) return;

        const newTheme = theme === "dark" ? "light" : "dark";
        
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return { theme, toggleTheme };
};
