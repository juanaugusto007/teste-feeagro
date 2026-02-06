'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { NewOperationForm } from "@/modules/operations/components/NewOperationForm";
import { walletService } from "@/services/walletService";
import { RWAPortfolioItem } from "@/types";
import { PiSpinner } from "react-icons/pi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewOperationPage() {
    const [portfolio, setPortfolio] = useState<RWAPortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await walletService.getPortfolio();
                setPortfolio(data);
            } catch (error) {
                console.error("Failed to load portfolio options", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <PiSpinner className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">{t.newOperation.title}</h1>
                <p className="text-muted-foreground">{t.newOperation.subtitle}</p>
            </div>

            <Card className="border-none shadow-lg bg-background">
                <CardHeader className="border-b bg-muted/20">
                    <CardTitle>{t.newOperation.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <NewOperationForm portfolio={portfolio} />
                </CardContent>
            </Card>
        </div>
    );
}
