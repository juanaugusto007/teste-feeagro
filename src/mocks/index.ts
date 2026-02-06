import { Account, RWAPortfolioItem, Transaction } from '../types';

export const mockAccount: Account = {
    accountId: '1234-5678-9012',
    ownerName: 'Fazenda Santa Cecília Ltd',
    currency: 'BRL',
    availableBalance: 1250000.00, // 1.25M
};

export const mockPortfolio: RWAPortfolioItem[] = [
    {
        id: '1',
        assetName: 'Soja Futuro 2026',
        tokenSymbol: 'RWA-SOJA-26',
        quantity: 5000,
        price: 132.50,
        totalValue: 662500.00,
        trend: 'up',
        change24h: 2.5
    },
    {
        id: '2',
        assetName: 'Milho Safra 25/26',
        tokenSymbol: 'RWA-MILHO-25',
        quantity: 12000,
        price: 58.40,
        totalValue: 700800.00,
        trend: 'down',
        change24h: -0.8
    },
    {
        id: '3',
        assetName: 'CPR Financeira Gado',
        tokenSymbol: 'CPR-BOI-01',
        quantity: 100,
        price: 4500.00,
        totalValue: 450000.00,
        trend: 'neutral',
        change24h: 0.1
    }
];

export const mockTransactions: Transaction[] = [
    {
        id: 't-1',
        date: '2026-02-05T10:30:00Z',
        description: 'Venda RWA Soja',
        type: 'IN',
        amount: 150000.00,
        status: 'COMPLETED',
        category: 'Venda Ativo'
    },
    {
        id: 't-2',
        date: '2026-02-04T14:15:00Z',
        description: 'Compra Insumos (AgroShop)',
        type: 'OUT',
        amount: 45000.50,
        status: 'COMPLETED',
        category: 'Pagamento'
    },
    {
        id: 't-3',
        date: '2026-02-03T09:00:00Z',
        description: 'Transferência para Conta Corrente',
        type: 'OUT',
        amount: 20000.00,
        status: 'COMPLETED',
        category: 'Transferência'
    },
    {
        id: 't-4',
        date: '2026-02-01T16:45:00Z',
        description: 'Rendimento CPR',
        type: 'IN',
        amount: 1250.00,
        status: 'COMPLETED',
        category: 'Rendimento'
    },
    {
        id: 't-5',
        date: '2026-01-28T11:20:00Z',
        description: 'Aquisição Maquinário (Entrada)',
        type: 'OUT',
        amount: 250000.00,
        status: 'PENDING',
        category: 'Investimento'
    }
];
