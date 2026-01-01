'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nContext';

const socialLinks = [
  {
    name: '微信',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.115-1.98.325 0 .623.017.93.05C17.486 4.188 13.38 2.188 8.691 2.188z"/>
      </svg>
    ),
  },
  {
    name: '微博',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443z"/>
      </svg>
    ),
  },
  {
    name: '邮箱',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    company: {
      title: t.footer.company,
      links: [
        { name: t.nav.about, href: '/about' },
        { name: t.nav.team, href: '/team' },
        { name: t.nav.contact, href: '/contact' },
      ],
    },
    services: {
      title: t.footer.services,
      links: [
        { name: t.services.strategy.title, href: '/services#strategy' },
        { name: t.services.branding.title, href: '/services#branding' },
        { name: t.services.marketing.title, href: '/services#marketing' },
        { name: t.services.digital.title, href: '/services#digital' },
      ],
    },
    resources: {
      title: t.footer.resources,
      links: [
        { name: t.nav.cases, href: '/posts' },
        { name: t.nav.cases, href: '/posts' },
        { name: t.nav.cases, href: '/posts' },
      ],
    },
  };

  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/60 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <motion.div
                className="w-14 h-14 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Image
                  src="/shuangming-logo.svg"
                  alt="双铭策划Logo"
                  width={56}
                  height={56}
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  双铭策划
                </h3>
                <p className="text-sm text-muted-foreground">合伙公司</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              {t.footer.description}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.button
                  key={index}
                  className="w-10 h-10 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t.home.heroTitle}. {t.footer.rights}.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors">
                {t.footer.sitemap}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
