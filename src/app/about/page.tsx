'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function AboutPage() {
  const { t } = useI18n();

  const values = t.about.values;
  const milestones = t.about.timeline;

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
              {t.about.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-10">
                  <div className="text-4xl mb-4">🎯</div>
                  <h2 className="text-3xl font-bold mb-4">{t.about.visionTitle}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.about.visionDescription}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                <CardContent className="p-10">
                  <div className="text-4xl mb-4">🚀</div>
                  <h2 className="text-3xl font-bold mb-4">{t.about.missionTitle}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t.about.missionDescription}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.about.valuesTitle}</h2>
            <p className="text-xl text-muted-foreground">
              {t.about.valuesSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.about.timelineTitle}</h2>
            <p className="text-xl text-muted-foreground">
              {t.about.timelineSubtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone: any, index: number) => (
              <motion.div
                key={index}
                className="flex gap-8 mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow pb-12 border-l-2 border-primary/30 pl-8 relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-[9px]" />
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <p className="text-lg">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
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
              {t.about.ctaTitle}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              {t.about.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/team"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                {t.about.meetTeam}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white/10 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                {t.about.contactUs}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
