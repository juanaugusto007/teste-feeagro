'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { RWAPortfolioItem } from "@/types";
import { useState } from 'react';

interface PortfolioCardProps {
    items: RWAPortfolioItem[];
}

import { useLanguage } from '@/contexts/LanguageContext';

// FeeAgro Brand Colors: Deep Green, Gold, lighter accents
const COLORS = ['#006837', '#FECC09', '#4ade80', '#16a34a'];

export function PortfolioCard({ items }: PortfolioCardProps) {
    const [activeIndex, setActiveIndex] = useState<number | undefined>();
    const { t } = useLanguage();

    const data = items.map(item => ({
        name: item.assetName,
        value: item.totalValue,
    }));

    const totalValue = items.reduce((acc, item) => acc + item.totalValue, 0);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <Card className="flex flex-col h-full shadow-sm border-none bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground/90">{t.portfolio.title}</CardTitle>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {t.dashboard.season}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col md:flex-row items-center gap-8 pt-8">
                {/* Chart Section */}
                <div className="h-[240px] w-full md:w-1/2 min-w-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={4}
                                dataKey="value"
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(undefined)}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="none"
                                        className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                        style={{ outline: activeIndex === index ? '4px solid rgba(0, 104, 55, 0.1)' : 'none' }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) => [formatCurrency(value), t.portfolio.value]}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    color: '#1a1a1a'
                                }}
                                itemStyle={{ color: '#006837', fontWeight: 600 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Centered Total */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{t.portfolio.total}</span>
                        <span className="text-xl font-bold text-foreground">{new Intl.NumberFormat('pt-BR', { notation: 'compact', compactDisplay: 'short', style: 'currency', currency: 'BRL' }).format(totalValue)}</span>
                    </div>
                </div>

                {/* Legend Section */}
                <div className="w-full md:w-1/2 space-y-5">
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between text-sm group p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(undefined)}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${activeIndex === index ? 'scale-125' : ''}`}
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{item.assetName}</span>
                                        <span className="text-[10px] text-muted-foreground">{item.tokenSymbol}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-semibold text-foreground">{formatCurrency(item.totalValue)}</span>
                                    <span className="text-[10px] text-green-600 font-medium">{item.quantity} un.</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
