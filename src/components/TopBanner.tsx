'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export function TopBanner() {
  const { t } = useI18n();

  return (
    <motion.div
      className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="hidden sm:inline">📍</span>
            <span className="text-xs sm:text-sm">美国纽约皇后区53rd 90</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">📧 shuangmingd2@gmail.com</span>
          </div>
          <Link
            href="/contact"
            className="text-primary hover:text-primary/80 font-medium transition-colors text-xs sm:text-sm flex items-center gap-1"
          >
            <span>💬</span>
            <span>{t.nav.consultation}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
