'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Locale } from '@/lib/dictionary';

interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof dictionary['pt'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Locale>('pt');

    useEffect(() => {
        // Load from local storage if needed, or default to generic 'pt'
        const stored = localStorage.getItem('FEEAGRO_LANG') as Locale;
        if (stored && (stored === 'pt' || stored === 'en')) {
            setLanguage(stored);
        }
    }, []);

    const handleSetLanguage = (lang: Locale) => {
        setLanguage(lang);
        localStorage.setItem('FEEAGRO_LANG', lang);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: dictionary[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
