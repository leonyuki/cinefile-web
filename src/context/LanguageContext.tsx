"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ja' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  // 簡易的に多言語テキストを出力するためのヘルパー関数
  t: (jaText: string, enText: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');

  // マウント時にブラウザの保存設定、またはブラウザの標準言語を読み込む
  useEffect(() => {
    const savedLang = localStorage.getItem('cinefile_lang') as Language;
    if (savedLang === 'ja' || savedLang === 'en') {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cinefile_lang', lang);
  };

  // テキストの切り替えを簡潔に行うためのヘルパー
  const t = (jaText: string, enText: string) => {
    return language === 'ja' ? jaText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}