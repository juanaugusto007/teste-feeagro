import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FeeAgro Dashboard',
  description: 'Gestão de Ativos Reais (RWA)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background flex flex-col md:flex-row`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Sidebar />
            <main className="flex-1 p-4 pt-20 md:p-8 md:pt-8 md:ml-64 overflow-y-auto h-screen w-auto border-none">
              <div className="max-w-6xl mx-auto space-y-8 pb-10">
                {children}
              </div>
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
