'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    title: '专业',
    description: '深耕行业多年，积累丰富的实战经验',
    icon: '🎯',
  },
  {
    title: '创新',
    description: '紧跟时代潮流，不断探索创新解决方案',
    icon: '💡',
  },
  {
    title: '诚信',
    description: '以诚信为本，建立长期合作关系',
    icon: '🤝',
  },
  {
    title: '共赢',
    description: '与客户共同成长，实现互利共赢',
    icon: '📈',
  },
];

const milestones = [
  { year: '2019', event: '公司成立，开启创业征程' },
  { year: '2020', event: '服务客户突破50家' },
  { year: '2021', event: '获得行业最佳策划公司奖' },
  { year: '2022', event: '团队扩展至30+人' },
  { year: '2023', event: '成功案例突破200个' },
  { year: '2024', event: '业务覆盖全国主要城市' },
];

export default function AboutPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              关于我们
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              双铭策划合伙公司成立于2019年，专注于为企业提供专业的策划、设计和营销服务。
              我们致力于助力品牌成长，创造商业价值。
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
                  <h2 className="text-3xl font-bold mb-4">我们的愿景</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    成为中国最具影响力的策划与品牌设计公司，
                    通过创新思维和专业服务，帮助更多企业实现品牌价值的提升。
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
                  <h2 className="text-3xl font-bold mb-4">我们的使命</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    为客户提供一站式的策划与设计服务，
                    以专业的态度、创新的思维，助力企业在竞争中脱颖而出，实现可持续发展。
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">核心价值观</h2>
            <p className="text-xl text-muted-foreground">
              我们坚守的信念与原则
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4">{value.icon}</div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">发展历程</h2>
            <p className="text-xl text-muted-foreground">
              见证我们的成长与进步
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
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
              期待与您合作
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              了解更多关于我们的信息，或立即开始您的项目
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/team"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                认识团队
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white/10 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                联系我们
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
export { metadata } from "./metadata";
