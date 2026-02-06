'use client';

import { PiArrowUpRight, PiTrendUp, PiPlant, PiInfo } from "react-icons/pi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Account } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
    account: Account;
}

import { useLanguage } from "@/contexts/LanguageContext";

export function BalanceCard({ account }: BalanceCardProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const { t } = useLanguage();

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: account.currency,
    });

    const estimatedSacks = Math.floor(account.availableBalance / 130);

    return (
        <Card className="bg-gradient-to-br from-[#006837] to-[#004d29] dark:from-[#006837] dark:to-green-950 text-white border-none relative overflow-hidden shadow-2xl shadow-green-900/20 group">
            {/* Dynamic Background Pattern */}
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 p-24 bg-secondary/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium text-green-100/90 tracking-wide uppercase">{t.portfolio.title}</CardTitle>
                    <div
                        className="relative"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <PiInfo className="w-4 h-4 text-green-200 cursor-help hover:text-white transition-colors" />

                        {/* Custom Tooltip */}
                        <div className={cn(
                            "absolute left-0 top-6 w-56 p-3 bg-black/90 backdrop-blur-md rounded-lg border border-white/10 text-xs text-gray-200 shadow-xl transition-all duration-200 z-50 origin-top-left",
                            showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        )}>
                            <p className="font-semibold text-white mb-1">{t.dashboard.balanceTooltipTitle}</p>
                            {t.dashboard.balanceTooltip}
                        </div>
                    </div>
                </div>
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <PiTrendUp className="h-4 w-4 text-secondary" />
                </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
                <div className="flex flex-col">
                    <span className="text-4xl font-bold tracking-tight text-white mb-1">
                        {formatter.format(account.availableBalance)}
                    </span>
                    <span className="text-xs text-green-300 font-medium">+12.5% vs. safra anterior</span>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/20 rounded-full">
                            <PiPlant className="h-5 w-5 text-secondary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-green-200/80">Poder de Compra</span>
                            <span className="text-sm font-bold text-white">~{estimatedSacks} Sacas (Soja)</span>
                        </div>
                    </div>
                    {/* Visual Button / Call to Action styling for visual balance */}
                    <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                        <PiArrowUpRight className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
