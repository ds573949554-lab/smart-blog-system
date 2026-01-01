'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nContext';
import { locales } from '@/lib/i18n/config';
import type { LocaleCode } from '@/lib/i18n/config';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  const handleSelect = (code: LocaleCode) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
        aria-label="切换语言"
      >
        <span className="text-lg">{currentLocale.flag}</span>
        <span className="hidden md:inline">{currentLocale.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 下拉菜单 */}
            <motion.div
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => handleSelect(loc.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      locale === loc.code
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-muted/50 text-foreground'
                    }`}
                  >
                    <span className="text-lg">{loc.flag}</span>
                    <span>{loc.name}</span>
                    {locale === loc.code && (
                      <svg
                        className="w-4 h-4 ml-auto text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
