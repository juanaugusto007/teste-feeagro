'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { transactionService } from "@/services/transactionService";
import { Transaction } from "@/types";
import { useState, useEffect } from "react";
import { TransactionsFilters } from "@/modules/transactions/components/TransactionsFilters";
import { TransactionsList } from "@/modules/transactions/components/TransactionsList";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TransactionsPage() {
    const [filterType, setFilterType] = useState<'ALL' | 'IN' | 'OUT'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    // Fetch transactions when filters change (Simulating Server-Side Filtering)
    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                // Debounce search could be added here, but simulated delay covers it for UX demo
                const data = await transactionService.getAll({
                    type: filterType,
                    term: searchTerm
                });
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchTransactions();
        }, 300); // 300ms debounce for typing

        return () => clearTimeout(timeoutId);

    }, [filterType, searchTerm]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">{t.transactions.title}</h1>
                <p className="text-muted-foreground">{t.transactions.subtitle}</p>
            </div>

            <Card className="border-none shadow-sm bg-background">
                <CardHeader className="pb-4 border-b">
                    <TransactionsFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        filterType={filterType}
                        onFilterChange={setFilterType}
                    />
                </CardHeader>
                <CardContent className="pt-6">
                    <TransactionsList
                        transactions={transactions}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
