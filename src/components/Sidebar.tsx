'use client';

import { PiSquaresFour, PiArrowsLeftRight, PiPlusCircle, PiSignOut, PiList } from 'react-icons/pi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    // Scroll Lock Effect
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const menuItems = [
        { label: t.sidebar.dashboard, icon: PiSquaresFour, href: '/' },
        { label: t.sidebar.transactions, icon: PiArrowsLeftRight, href: '/transactions' },
        { label: t.sidebar.newOperation, icon: PiPlusCircle, href: '/operations/new' },
    ];

    return (
        <>
            {/* Mobile Toggle Button - Flowbite Style */}
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-foreground rounded-lg md:hidden hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
                <span className="sr-only">Open sidebar</span>
                <PiList className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Sidebar Drawer - Flowbite Style Adapted */}
            <aside
                id="default-sidebar"
                className={cn(
                    "fixed top-0 left-0 z-[100] w-64 h-full transition-transform bg-card text-card-foreground border-r border-border",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0"
                )}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-card flex flex-col">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center ps-2.5 mb-5">
                        <div className="relative w-32 h-8">
                            <Image
                                src="/feeagro.png"
                                alt="FeeAgro Logo"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <ul className="space-y-2 font-medium flex-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center p-2 rounded-lg group transition-colors",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "w-5 h-5 transition duration-75",
                                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="ms-3">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Footer Actions */}
                    <div className="mt-auto border-t border-border pt-4 space-y-2">
                        <div className="flex gap-2 px-1">
                            <ThemeToggle className="flex-1 justify-center hover:bg-muted border-none shadow-none" />
                            <LanguageToggle className="flex-1 justify-center hover:bg-muted border-none shadow-none" />
                        </div>

                        <button className="flex items-center w-full p-2 text-foreground rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 group transition-colors">
                            <PiSignOut className="flex-shrink-0 w-5 h-5 text-muted-foreground transition duration-75 group-hover:text-red-600" aria-hidden="true" />
                            <span className="flex-1 ms-3 whitespace-nowrap text-left text-sm font-medium">{t.sidebar.logout}</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[90] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}