'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n/I18nContext';
import Image from 'next/image';
import { LogIn, LogOut, User } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();
  const { data: session, status } = useSession();

  const navItems = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.aiProject, href: '/ai-project' },
    { name: t.nav.cases, href: '/posts' },
    { name: t.nav.team, href: '/team' },
    { name: t.nav.contact, href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm shadow-md lg:bg-transparent lg:shadow-none'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-12 h-12 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/shuangming-logo.svg"
                alt="双铭策划Logo"
                width={48}
                height={48}
                priority
              />
            </motion.div>
            {/* 桌面端显示完整信息 */}
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-brand tracking-wide hover:scale-105 transition-all duration-300">
                双铭策划
              </h1>
              <p className="text-xs font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-brand tracking-wide">合伙公司</p>
            </div>
            {/* 手机端显示简洁公司名 */}
            <div className="md:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap font-brand tracking-wide">
                双铭策划
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Language Switcher & Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />

            {/* 登录/注销按钮 */}
            {status === 'loading' ? (
              <Button disabled variant="ghost" className="gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                加载中...
              </Button>
            ) : session ? (
              <div className="flex items-center gap-3">
                <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{session.user?.name || session.user?.email}</span>
                </div>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="gap-2 shadow-lg"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </Button>
              </div>
            ) : (
              <Button asChild variant="default" className="gap-2 shadow-lg">
                <Link href="/auth/signin">
                  <LogIn className="h-4 w-4" />
                  登录
                </Link>
              </Button>
            )}

            <Button asChild className="shadow-lg">
              <Link href="/contact">{t.nav.consultation}</Link>
            </Button>
          </div>

          {/* Mobile Auth Button, Language Switcher & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* 手机端语言切换器 */}
            <LanguageSwitcher />

            {/* 手机端登录按钮 */}
            {status === 'loading' ? (
              <div className="h-8 w-8 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : session ? (
              <Button
                onClick={() => signOut()}
                variant="ghost"
                size="sm"
                className="h-8 px-2 gap-1 text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">退出</span>
              </Button>
            ) : (
              <Button
                asChild
                variant="default"
                size="sm"
                className="h-8 px-3 gap-1 shadow-md text-sm"
              >
                <Link href="/auth/signin">
                  <LogIn className="h-4 w-4" />
                  <span>登录</span>
                </Link>
              </Button>
            )}

            {/* 汉堡菜单按钮 */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-border bg-white/95"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-3 pb-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-muted'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  );
                })}
                <div className="pt-4 space-y-3 border-t border-border mt-2">
                  {/* 移动端登录/注销 */}
                  <div className="px-4 space-y-2">
                    {status === 'loading' ? (
                      <Button disabled className="w-full gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        加载中...
                      </Button>
                    ) : session ? (
                      <>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 mb-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">{session.user?.name || session.user?.email}</span>
                        </div>
                        <Button
                          onClick={() => {
                            signOut();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          退出登录
                        </Button>
                      </>
                    ) : (
                      <Button asChild className="w-full gap-2">
                        <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                          <LogIn className="h-4 w-4" />
                          登录
                        </Link>
                      </Button>
                    )}
                  </div>

                  <div className="px-4 flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  <div className="px-4">
                    <Button asChild className="w-full">
                      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        {t.nav.consultation}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
