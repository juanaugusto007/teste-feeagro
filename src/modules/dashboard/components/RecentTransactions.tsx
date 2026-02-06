import { PiArrowDownLeft, PiArrowUpRight, PiClock } from "react-icons/pi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Transaction } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useLanguage } from "@/contexts/LanguageContext";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const { t } = useLanguage();
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
        });
    };

    return (
        <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg text-primary">{t.dashboard.recentTransactions}</CardTitle>
                <Link href="/transactions" className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors">
                    {t.dashboard.viewAll}
                </Link>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
                <div className="space-y-0 divide-y divide-border/50">
                    {transactions.slice(0, 5).map((t) => (
                        <Link href={`/transactions/${t.id}`} key={t.id} className="flex items-center justify-between py-4 group cursor-pointer hover:bg-muted/20 px-2 -mx-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border transition-colors",
                                    t.type === 'IN'
                                        ? "bg-green-50 text-green-600 border-green-100 group-hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800"
                                        : "bg-red-50 text-red-600 border-red-100 group-hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800"
                                )}>
                                    {t.type === 'IN' ? <PiArrowDownLeft className="w-5 h-5" /> : <PiArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t.description}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                        <span>{formatDate(t.date)}</span>
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                        <span>{t.category}</span>
                                        {t.status === 'PENDING' && (
                                            <span className="flex items-center gap-0.5 text-amber-500 font-medium ml-1 bg-amber-50 px-1.5 rounded-full text-[10px]">
                                                <PiClock className="w-3 h-3" />
                                                Pendente
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={cn(
                                "text-sm font-bold tabular-nums",
                                t.type === 'IN' ? "text-green-600" : "text-foreground"
                            )}>
                                {t.type === 'IN' ? '+' : '-'} {formatCurrency(t.amount)}
                            </div>
                        </Link>
                    ))}
                    {transactions.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            {t.dashboard.noTransactions}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
