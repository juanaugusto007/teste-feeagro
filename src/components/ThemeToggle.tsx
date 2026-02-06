"use client"

import * as React from "react"
import { PiMoon, PiSun } from "react-icons/pi"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
                "relative p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors",
                className
            )}
            aria-label="Alternar tema"
        >
            <PiSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <PiMoon className="absolute top-2 left-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
    )
}
