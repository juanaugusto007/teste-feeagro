import { Transaction } from '@/types';
import { mockTransactions } from '@/mocks';

const SIMULATED_DELAY = 600;
const STORAGE_KEY = 'FEEAGRO_TRANSACTIONS_V1';

// Helper to get from storage or fallback to mocks
const getStoredTransactions = (): Transaction[] => {
    if (typeof window === 'undefined') return mockTransactions;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // Initialize with mocks if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTransactions));
        return mockTransactions;
    }

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse stored transactions", e);
        return mockTransactions;
    }
};

interface GetTransactionsParams {
    type?: 'IN' | 'OUT' | 'ALL';
    term?: string;
}

export const transactionService = {
    getAll: async (params?: GetTransactionsParams): Promise<Transaction[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let data = getStoredTransactions();

                if (params?.type && params.type !== 'ALL') {
                    data = data.filter((t) => t.type === params.type);
                }

                if (params?.term) {
                    const lowerTerm = params.term.toLowerCase();
                    data = data.filter(
                        (t) =>
                            t.description.toLowerCase().includes(lowerTerm) ||
                            t.category?.toLowerCase().includes(lowerTerm)
                    );
                }

                // Sort by date desc (newest first)
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                resolve(data);
            }, SIMULATED_DELAY);
        });
    },

    getRecent: async (limit = 5): Promise<Transaction[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = getStoredTransactions();
                // Sort by date desc
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                resolve(data.slice(0, limit));
            }, SIMULATED_DELAY);
        });
    },

    getById: async (id: string): Promise<Transaction | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = getStoredTransactions();
                resolve(data.find(t => t.id === id));
            }, SIMULATED_DELAY);
        });
    },

    create: async (data: Partial<Transaction>): Promise<Transaction> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTransaction: Transaction = {
                    id: Math.random().toString(36).substr(2, 9),
                    date: new Date().toISOString(),
                    description: data.description || 'Nova Operação',
                    type: data.type || 'OUT',
                    amount: data.amount || 0,
                    status: 'COMPLETED',
                    category: data.category || 'Geral'
                };

                // Save to Storage
                if (typeof window !== 'undefined') {
                    const current = getStoredTransactions();
                    const updated = [newTransaction, ...current];
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                }

                resolve(newTransaction);
            }, 1000); // Slower for write operations
        });
    }
};
