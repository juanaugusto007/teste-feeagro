export type Currency = 'BRL' | 'USD';

export interface Account {
    accountId: string;
    ownerName: string;
    currency: Currency;
    availableBalance: number;
}

export interface RWAPortfolioItem {
    id: string;
    assetName: string; // e.g., 'Agro Brasileiro'
    tokenSymbol: string; // e.g., 'AGRO-B'
    quantity: number;
    price: number; // Current price per unit
    totalValue: number; // quantity * price
    trend: 'up' | 'down' | 'neutral'; // For visual sparkline/indicator
    change24h: number; // Percentage change
}

export type TransactionType = 'IN' | 'OUT';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export interface Transaction {
    id: string;
    date: string; // ISO date string
    description: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    category?: string; // e.g., 'Transfer', 'Investment', 'Deposit'
}

export interface OperationFormData {
    type: 'TRANSFER' | 'INVESTMENT';
    amount: number;
    toAddress?: string; // For transfer
    assetId?: string; // For investment
    description?: string;
}
