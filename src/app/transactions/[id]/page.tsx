'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { transactionService } from "@/services/transactionService";
import { Transaction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PiCheckCircle, PiShareNetwork, PiPrinter, PiArrowLeft, PiDownloadSimple } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReceiptPage() {
    const params = useParams();
    const router = useRouter();
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchReceipt = async () => {
            if (params.id) {
                const data = await transactionService.getById(params.id as string);
                setTransaction(data || null);
            }
            setLoading(false);
        };
        fetchReceipt();
    }, [params.id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <p className="text-muted-foreground">{t.receipt.notFound}</p>
                <button onClick={() => router.back()} className="text-primary hover:underline">
                    {t.receipt.btnBack}
                </button>
            </div>
        );
    }

    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const date = new Date(transaction.date);

    const handleShare = async () => {
        const shareData = {
            title: t.receipt.title,
            text: `${t.receipt.title} - ${t.receipt.totalValue}: ${formatter.format(transaction.amount)}`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    return (
        <div className="max-w-lg mx-auto py-8 animate-in fade-in slide-in-from-bottom-4">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6 print:hidden">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <PiArrowLeft className="w-4 h-4" />
                    {t.receipt.btnBack}
                </button>
                <div className="flex gap-2">
                    <button onClick={handlePrint} className="p-2 hover:bg-muted rounded-full text-foreground/80" title="Imprimir">
                        <PiPrinter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2 hover:bg-muted rounded-full text-foreground/80"
                        title="Compartilhar"
                    >
                        <PiShareNetwork className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Receipt Card */}
            <Card className="border-none shadow-2xl print:shadow-none print:border bg-card">
                <div className="h-2 w-full bg-gradient-to-r from-[#006837] to-[#FECC09]" />
                <CardContent className="pt-8 px-8 pb-10">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 print:border">
                            <PiCheckCircle className="w-8 h-8" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground">{t.receipt.title}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{date.toLocaleString('pt-BR')}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl border border-dashed border-border/60">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{t.receipt.totalValue}</span>
                            <span className={cn(
                                "text-3xl font-bold tabular-nums",
                                transaction.type === 'IN' ? "text-green-600" : "text-foreground"
                            )}>
                                {transaction.type === 'IN' ? '+' : '-'} {formatter.format(transaction.amount)}
                            </span>
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b border-border/40">
                                <span className="text-muted-foreground">{t.receipt.type}</span>
                                <span className="font-medium text-foreground">{transaction.category || 'Geral'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/40">
                                <span className="text-muted-foreground">{t.receipt.desc}</span>
                                <span className="font-medium text-foreground text-right max-w-[60%]">{transaction.description}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/40">
                                <span className="text-muted-foreground">{t.receipt.id}</span>
                                <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{transaction.id}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/40">
                                <span className="text-muted-foreground">{t.receipt.status}</span>
                                <span className="font-medium text-green-600 flex items-center gap-1">
                                    {t.transactions.statusCompleted}
                                    <PiCheckCircle className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </div>

                        {/* Footer Logo */}
                        <div className="mt-12 pt-6 border-t flex flex-col items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <div className="text-lg font-bold tracking-tight text-[#006837]">FeeAgro</div>
                            <p className="text-[10px] text-muted-foreground text-center">
                                {t.receipt.footerText} <br />
                                Autenticação: {Math.random().toString(36).substring(7).toUpperCase()}-{Date.now().toString(36).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
