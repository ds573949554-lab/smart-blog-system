'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Target, Palette, TrendingUp, Zap } from 'lucide-react';

export default function ServicesPage() {
  const { t } = useI18n();

  // 服务图标组件
  const serviceIcons = {
    strategy: <Target className="w-8 h-8" />,
    branding: <Palette className="w-8 h-8" />,
    marketing: <TrendingUp className="w-8 h-8" />,
    digital: <Zap className="w-8 h-8" />,
  };

  // 动态获取服务数据
  const services = [
    {
      id: 'strategy',
      title: t.services.strategy.title,
      description: t.services.strategy.description,
      icon: serviceIcons.strategy,
      color: 'from-blue-500 to-cyan-500',
      features: t.services.strategy.features,
    },
    {
      id: 'branding',
      title: t.services.branding.title,
      description: t.services.branding.description,
      icon: serviceIcons.branding,
      color: 'from-purple-500 to-pink-500',
      features: t.services.branding.features,
    },
    {
      id: 'marketing',
      title: t.services.marketing.title,
      description: t.services.marketing.description,
      icon: serviceIcons.marketing,
      color: 'from-orange-500 to-red-500',
      features: t.services.marketing.features,
    },
    {
      id: 'digital',
      title: t.services.digital.title,
      description: t.services.digital.description,
      icon: serviceIcons.digital,
      color: 'from-green-500 to-emerald-500',
      features: t.services.digital.features,
    },
  ];

  const process = t.services.process;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-gradient-text">
              {t.services.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <CardContent className="p-10">
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground mb-4">
                        核心服务：
                      </h3>
                      {service.features.map((feature: string, idx: number) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.services.processTitle}</h2>
            <p className="text-xl text-muted-foreground">
              {t.services.processSubtitle}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {process.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6 md:p-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg md:text-xl mx-auto mb-4">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="font-bold mb-2 text-base md:text-lg">{item.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-8 -translate-y-1/2 -translate-x-4">
                      <svg
                        className="w-full h-2 text-primary/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.services.ctaTitle}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              {t.services.ctaSubtitle}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg h-14 px-8 shadow-xl"
            >
              <Link href="/contact">{t.nav.consultation}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
