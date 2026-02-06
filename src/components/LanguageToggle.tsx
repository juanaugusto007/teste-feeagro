'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
    const { language, setLanguage } = useLanguage();

    return (
        <div className={cn("flex items-center gap-1 bg-muted/50 p-1 rounded-lg", className)}>
            <button
                onClick={() => setLanguage('pt')}
                className={cn(
                    "px-2 py-1 text-xs font-bold rounded-md transition-all",
                    language === 'pt'
                        ? "bg-white dark:bg-black/40 shadow text-primary"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                PT
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={cn(
                    "px-2 py-1 text-xs font-bold rounded-md transition-all",
                    language === 'en'
                        ? "bg-white dark:bg-black/40 shadow text-primary"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                EN
            </button>
        </div>
    );
}
