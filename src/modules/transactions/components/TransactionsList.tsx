import { PiArrowDownLeft, PiArrowUpRight, PiCalendarBlank, PiFunnel, PiClock, PiCheckCircle, PiXCircle } from "react-icons/pi";
import Link from "next/link";
import { Transaction } from "@/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface TransactionsListProps {
    transactions: Transaction[];
    isLoading: boolean;
}

export function TransactionsList({ transactions, isLoading }: TransactionsListProps) {
    const { t } = useLanguage();
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 w-full bg-muted/50 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-16 bg-muted/5 rounded-xl border border-dashed border-border/60">
                <PiFunnel className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium text-foreground">{t.dashboard.noTransactions}</h3>
                <p className="text-muted-foreground text-sm">Tente ajustar seus filtros de busca para encontrar o que procura.</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-border/40">
            {transactions.map((tItem) => (
                <Link
                    href={`/transactions/${tItem.id}`}
                    key={tItem.id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 px-2 hover:bg-muted/30 transition-colors group first:pt-0 last:pb-0 cursor-pointer block"
                >
                    <div className="flex items-start md:items-center gap-4">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border shrink-0 transition-colors",
                            tItem.type === 'IN'
                                ? "bg-green-50/50 text-green-600 border-green-100 group-hover:bg-green-100/50 dark:bg-green-900/10 dark:border-green-900/50"
                                : "bg-red-50/50 text-red-600 border-red-100 group-hover:bg-red-100/50 dark:bg-red-900/10 dark:border-red-900/50"
                        )}>
                            {tItem.type === 'IN' ? <PiArrowDownLeft className="w-5 h-5" /> : <PiArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-foreground/90">{tItem.description}</h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1 font-medium">
                                    {formatDate(tItem.date)}
                                </span>
                                <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                <span>
                                    {tItem.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end mt-2 md:mt-0 pl-14 md:pl-0">
                        <span className={cn(
                            "font-bold text-base tabular-nums",
                            tItem.type === 'IN' ? "text-green-700 dark:text-green-500" : "text-foreground"
                        )}>
                            {tItem.type === 'IN' ? '+' : '-'} {formatCurrency(tItem.amount)}
                        </span>

                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ml-auto mt-0.5",
                            tItem.status === 'COMPLETED' ? "text-green-600/70 dark:text-green-400/60" : "text-amber-600/70"
                        )}>
                            {tItem.status === 'COMPLETED' ? t.transactions.statusCompleted : t.transactions.statusPending}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
