'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LocaleCode } from './config';
import { defaultLocale } from './config';
import { getTranslation } from './translations';
import type { Translation } from './translations/zh-CN';

interface I18nContextType {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // 从 localStorage 读取保存的语言设置
  const [locale, setLocaleState] = useState<LocaleCode>(defaultLocale);
  const [t, setT] = useState<Translation>(getTranslation(defaultLocale));

  useEffect(() => {
    // 从 localStorage 读取语言设置
    const savedLocale = localStorage.getItem('locale') as LocaleCode;
    if (savedLocale) {
      setLocaleState(savedLocale);
      setT(getTranslation(savedLocale));
    }
  }, []);

  const setLocale = (newLocale: LocaleCode) => {
    setLocaleState(newLocale);
    setT(getTranslation(newLocale));
    // 保存到 localStorage
    localStorage.setItem('locale', newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
