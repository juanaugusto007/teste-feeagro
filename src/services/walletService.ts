import { Account, RWAPortfolioItem } from '@/types';
import { mockAccount, mockPortfolio } from '@/mocks';

const SIMULATED_DELAY = 800; // 0.8s latency

export const walletService = {
    getAccount: async (): Promise<Account> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockAccount);
            }, SIMULATED_DELAY);
        });
    },

    getPortfolio: async (): Promise<RWAPortfolioItem[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockPortfolio);
            }, SIMULATED_DELAY + 200); // Slightly longer delay
        });
    },

    refreshData: async (): Promise<void> => {
        // Simulate a refresh action
        return new Promise((resolve) => setTimeout(resolve, 500));
    }
};
