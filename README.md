# FeeAgro - Dashboard Técnico

Bem-vindo ao repositório do teste técnico para Frontend Senior na FeeAgro.
Este projeto simula um recorte realista de um WebApp Banking/Web3 focado em Ativos Reais (RWA).

## 🚀 Como Rodar

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  **Acesse:**
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛠️ Stack Tecnológica

-   **Next.js 14+ (App Router):** Framework React moderno para SSR/SSG e otimização.
-   **TypeScript:** Segurança de tipagem e manutenibilidade.
-   **Tailwind CSS:** Estilização utility-first, rápida e consistente.
-   **Lucide React:** Ícones leves e consistentes.
-   **Recharts:** Biblioteca de gráficos flexível para React.
-   **Zod + React Hook Form:** Validação de formulários robusta e performática.
-   **clsx + tailwind-merge:** Utilitários para gestão dinâmica de classes CSS.

## 🧠 Decisões e Arquitetura (Senior Refactor)

Recentemente, o projeto passou por uma refatoração arquitetural para seguir princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**:

-   **Modularização por Domínio (`src/modules`):**
    -   `modules/dashboard`: Componentes e lógica exclusivos do painel principal (Balance, Portfolio).
    -   `modules/transactions`: Listagem, filtros e regras de exibição de extrato.
    -   `modules/operations`: Formulários complexos e fluxos transacionais (Nova Operação).
    -   *Por que?* Em projetos grandes, organizar por funcionalidade (Feature-based) escala melhor do que por tipo técnico.

-   **Camada de Serviço (`src/services`):**
    -   Criamos `walletService` e `transactionService`.
    -   Todas as chamadas são **assíncronas** (Promises) com delay simulado para mimetizar latência de rede (Loading States reais).
    -   *Por que?* Desacopla a UI da origem dos dados. Se precisarmos conectar uma API real, basta alterar o Service, sem tocar nos componentes.

-   **Estética & Domínio RWA:**
    -   Foco em "Patrimônio Tokenizado" e referência a "Sacas de Grãos".
    -   Design system consistente com identidade visual FeeAgro (Verde/Gold).

## ⚖️ Trade-offs
-   **Services Mockados:** Optou-se por simular latência no frontend em vez de subir um backend Node.js separado para manter o projeto "standalone" e fácil de rodar (`npm run dev`), mas demonstrando tratamento profissional de assincronismo.
-   **State Management:** O estado é gerenciado via Hooks (`useState`, `useEffect`) dentro dos módulos ou páginas "Controller". Em produção, usaríamos React Query (TanStack Query) para cache e deduplicação de requests.
-   **Componentes UI:** Optei por construir componentes "leves" com Tailwind puro (Card, Sidebar, Modal) em vez de instalar bibliotecas pesadas de UI (MUI, AntD) para demonstrar controle sobre o CSS e manter o bundle pequeno.
-   **Gráficos:** Recharts foi escolhido pela facilidade e integração com React, embora D3.js fosse mais performático para visualizações extremamente complexas (que não era o caso).

## 🔮 O que melhoraria com mais tempo?

1.  **Testes:** Implementar testes unitários (Jest/Vitest) e E2E (Playwright/Cypress).
2.  **Autenticação:** Integração real com NextAuth ou provedor Web3 (WalletConnect).
3.  **Componentes Robustos:** Refinar acessibilidade (ARIA) dos componentes customizados (Dropdowns, Modais).
4.  **Backend Integration:** Conectar com uma API real (GraphQL ou REST).
5.  **Internacionalização (i18n):** Suporte completo para Multi-idioma.
