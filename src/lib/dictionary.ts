
export type Locale = 'pt' | 'en';

export const dictionary = {
    pt: {
        sidebar: {
            dashboard: 'Dashboard',
            transactions: 'Extrato',
            newOperation: 'Nova Operação',
            settings: 'Configurações',
            farmName: 'Fazenda Santa Maria',
            logout: 'Sair'
        },
        dashboard: {
            welcome: 'Dashboard',
            subtitle: 'Visão geral do seu patrimônio agro.',
            season: 'Safra 2026/27',
            marketingTitle: 'Operar Safra Futura?',
            marketingText: 'O mercado de Soja Futuro está em alta. Aproveite para travar seus custos ou investir em novos ativos tokenizados.',
            btnNewOperation: 'Nova Operação',
            recentTransactions: 'Últimas Movimentações',
            viewAll: 'Ver extrato completo',
            noTransactions: 'Nenhuma transação recente.',
            balanceTooltip: 'Seu saldo total tokenizado na plataforma, lastreado em ativos reais como grãos e títulos do agro.',
            balanceTooltipTitle: 'O que é isso?'
        },
        portfolio: {
            title: 'Portfólio RWA',
            total: 'Total',
            value: 'Valor'
        },
        newOperation: {
            title: 'Nova Operação',
            subtitle: 'Realize transferências e investimentos em ativos RWA.',
            typeTransfer: 'Transferência',
            typeTransferDesc: 'Envie valores para outras contas',
            typeInvestment: 'Investimento',
            typeInvestmentDesc: 'Aplique em ativos RWA (Soja, Milho)',
            labelValue: 'Valor (R$)',
            labelRecipient: 'Destinatário (Chave Pix ou Conta)',
            labelAsset: 'Ativo RWA',
            labelDesc: 'Descrição (Opcional)',
            placeholderDesc: 'Ex: Aquisição de insumos',
            placeholderRecipient: 'Ex: joao@exemplo.com',
            selectAsset: 'Selecione um ativo...',
            btnSubmit: 'Confirmar Operação',
            btnProcessing: 'Processando...',
            successTitle: 'Operação Realizada!',
            successText: 'Sua operação foi processada com sucesso e já está disponível no extrato.',
            btnReceipt: 'Ver Comprovante',
            btnHome: 'Voltar ao Início'
        },
        transactions: {
            title: 'Extrato',
            subtitle: 'Histórico completo de suas movimentações.',
            searchPlaceholder: 'Buscar comprovantes...',
            filterAll: 'Todas',
            filterIn: 'Entradas',
            filterOut: 'Saídas',
            statusCompleted: 'Concluído',
            statusPending: 'Pendente'
        },
        receipt: {
            title: 'Comprovante de Operação',
            totalValue: 'Valor Total',
            type: 'Tipo',
            desc: 'Descrição',
            id: 'ID da Transação',
            status: 'Status',
            footerText: 'Este comprovante possui valor de conferência.',
            notFound: 'Comprovante não encontrado.',
            btnBack: 'Voltar'
        }
    },
    en: {
        sidebar: {
            dashboard: 'Dashboard',
            transactions: 'Statement',
            newOperation: 'New Operation',
            settings: 'Settings',
            farmName: 'Santa Maria Farm',
            logout: 'Logout'
        },
        dashboard: {
            welcome: 'Dashboard',
            subtitle: 'Overview of your agro assets.',
            season: 'Season 2026/27',
            marketingTitle: 'Trade Future Crops?',
            marketingText: 'Soybean Future market is up. Lock in your costs or invest in new tokenized assets.',
            btnNewOperation: 'New Operation',
            recentTransactions: 'Recent Transactions',
            viewAll: 'View full statement',
            noTransactions: 'No recent transactions.',
            balanceTooltip: 'Your total tokenized balance on the platform, backed by real assets like grains and agro bonds.',
            balanceTooltipTitle: 'What is this?'
        },
        portfolio: {
            title: 'RWA Portfolio',
            total: 'Total',
            value: 'Value'
        },
        newOperation: {
            title: 'New Operation',
            subtitle: 'Perform transfers and investments in RWA assets.',
            typeTransfer: 'Transfer',
            typeTransferDesc: 'Send funds to other accounts',
            typeInvestment: 'Investment',
            typeInvestmentDesc: 'Invest in RWA assets (Soy, Corn)',
            labelValue: 'Amount (R$)',
            labelRecipient: 'Recipient (Pix Key or Account)',
            labelAsset: 'RWA Asset',
            labelDesc: 'Description (Optional)',
            placeholderDesc: 'Ex: Input acquisition',
            placeholderRecipient: 'Ex: john@example.com',
            selectAsset: 'Select an asset...',
            btnSubmit: 'Confirm Operation',
            btnProcessing: 'Processing...',
            successTitle: 'Operation Successful!',
            successText: 'Your operation was processed successfully and is now available in your statement.',
            btnReceipt: 'View Receipt',
            btnHome: 'Back to Home'
        },
        transactions: {
            title: 'Statement',
            subtitle: 'Complete history of your transactions.',
            searchPlaceholder: 'Search receipts...',
            filterAll: 'All',
            filterIn: 'Incomes',
            filterOut: 'Expenses',
            statusCompleted: 'Completed',
            statusPending: 'Pending'
        },
        receipt: {
            title: 'Transaction Receipt',
            totalValue: 'Total Amount',
            type: 'Type',
            desc: 'Description',
            id: 'Transaction ID',
            status: 'Status',
            footerText: 'This receipt is for conference purposes only.',
            notFound: 'Receipt not found.',
            btnBack: 'Back'
        }
    }
};
