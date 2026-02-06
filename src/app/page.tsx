'use client';

import { useEffect, useState } from 'react';
import { BalanceCard } from "@/modules/dashboard/components/BalanceCard";
import { PortfolioCard } from "@/modules/dashboard/components/PortfolioCard";
import { RecentTransactions } from "@/modules/dashboard/components/RecentTransactions";
import { walletService } from "@/services/walletService";
import { transactionService } from "@/services/transactionService";
import { Account, RWAPortfolioItem, Transaction } from "@/types";
import { PiSpinner } from "react-icons/pi";
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const [data, setData] = useState<{
    account: Account | null;
    portfolio: RWAPortfolioItem[];
    transactions: Transaction[];
  }>({
    account: null,
    portfolio: [],
    transactions: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [account, portfolio, transactions] = await Promise.all([
          walletService.getAccount(),
          walletService.getPortfolio(),
          transactionService.getRecent()
        ]);
        setData({ account, portfolio, transactions });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <PiSpinner className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Carregando dados RWA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">{t.dashboard.welcome}</h1>
          <p className="text-muted-foreground">{t.dashboard.subtitle}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {t.dashboard.season}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Balance Card - Takes 1 column */}
        <div className="col-span-1">
          {data.account && <BalanceCard account={data.account} />}
        </div>

        {/* Quick Actions / Marketing Banner */}
        <div className="col-span-1 lg:col-span-2 hidden md:block">
          <div className="h-full rounded-xl bg-muted/30 dark:bg-card border border-border p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-semibold text-lg text-primary mb-2">{t.dashboard.marketingTitle}</h3>
              <p className="text-sm text-foreground/80 mb-4 max-w-md">
                {t.dashboard.marketingText}
              </p>
              <Link href="/operations/new" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-bold w-fit hover:bg-green-700 transition-all shadow-md hover:shadow-lg shadow-green-900/20 active:scale-95 hover:scale-105 flex items-center gap-2">
                {t.dashboard.btnNewOperation}
                <span className="text-lg">→</span>
              </Link>
            </div>
            {/* Background Pattern */}
            <div className="absolute right-0 bottom-0 opacity-10">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#006837" d="M45.7,-76.3C58.9,-69.3,69.1,-55.5,75.9,-40.8C82.7,-26.1,86.1,-10.5,83.8,4.1C81.4,18.7,73.3,32.3,63.1,43.4C52.9,54.5,40.6,63.1,27.3,69.4C14,75.7,-0.3,79.7,-13.8,77.7C-27.3,75.7,-40,67.7,-51.3,57.1C-62.6,46.5,-72.5,33.3,-76.6,18.6C-80.7,3.9,-79,-12.3,-72.2,-26.4C-65.4,-40.5,-53.5,-52.5,-40.5,-59.6C-27.5,-66.7,-13.7,-68.9,0.8,-70.2C15.3,-71.5,30.6,-71.9,45.7,-76.3Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4 h-full">
          <PortfolioCard items={data.portfolio} />
        </div>
        <div className="lg:col-span-3 h-full">
          <RecentTransactions transactions={data.transactions} />
        </div>
      </div>
    </div>
  );
}
