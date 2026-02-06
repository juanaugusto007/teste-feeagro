'use client';

import { PiSquaresFour, PiArrowsLeftRight, PiPlusCircle, PiSignOut, PiList } from 'react-icons/pi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const menuItems = [
        { label: t.sidebar.dashboard, icon: PiSquaresFour, href: '/' },
        { label: t.sidebar.transactions, icon: PiArrowsLeftRight, href: '/transactions' },
        { label: t.sidebar.newOperation, icon: PiPlusCircle, href: '/operations/new' },
    ];

    return (
        <>
            {/* Mobile Toggle - Glassy Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-md border-b z-50 px-4 flex items-center justify-between animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                    <div className="relative w-28 h-8">
                        <Image
                            src="/feeagro.png"
                            alt="FeeAgro Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Alternar menu lateral"
                >
                    <PiList className="w-6 h-6 text-foreground" />
                </button>
            </div>

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-72 bg-background/95 backdrop-blur-xl border-r border-border shadow-2xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:block md:bg-card md:shadow-none",
                isOpen ? "translate-x-0" : "-translate-x-full",
                "pt-24 md:pt-0" // Mobile padding
            )}>
                <div className="h-full flex flex-col p-6">
                    {/* Logo (Desktop) */}
                    <div className="hidden md:flex items-center justify-start mb-12 px-2 mt-4">
                        <div className="relative w-40 h-10 hover:opacity-90 transition-opacity cursor-pointer">
                            <Link href="/">
                                <Image
                                    src="/feeagro.png"
                                    alt="FeeAgro Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <p className="px-4 text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest mb-4">
                            {t.sidebar.dashboard.toUpperCase()} {/* Or generic menu title */}
                        </p>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm",
                                        isActive
                                            ? "bg-primary/10 text-primary font-semibold" // Active
                                            : "text-foreground/80 hover:bg-muted hover:text-foreground" // Inactive - Darker text
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "fill-current" : "")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto space-y-4">
                        <div className="grid grid-cols-2 gap-2 px-1">
                            <ThemeToggle className="w-full justify-between hover:bg-muted border-none shadow-none" />
                            <LanguageToggle className="w-full justify-center" />
                        </div>
                        <div className="h-px bg-border/50 w-full" />
                        <button className="flex items-center gap-3 px-4 py-2 text-foreground/80 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors font-medium text-sm w-full group">
                            <PiSignOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            {t.sidebar.logout}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-[2px] animate-in fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
