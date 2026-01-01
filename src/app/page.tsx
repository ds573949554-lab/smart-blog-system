'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    title: '战略策划',
    description: '为企业提供全方位的战略规划，助力长期发展',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: '品牌设计',
    description: '打造独特的品牌形象，提升品牌价值',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: '营销推广',
    description: '精准的市场定位，高效的推广策略',
    icon: '📈',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: '数字化解决方案',
    description: '前沿技术赋能，助力企业数字化转型',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  { value: '100+', label: '服务客户' },
  { value: '200+', label: '成功案例' },
  { value: '98%', label: '客户满意度' },
  { value: '5年+', label: '行业经验' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-6 px-6 py-2 bg-primary/10 rounded-full text-primary font-semibold"
            >
              专业策划 · 品牌设计 · 营销推广
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              双铭策划合伙公司
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              助力品牌成长，创造商业价值
              <br />
              专注于为企业提供一站式策划与设计服务
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="text-lg h-14 px-8 shadow-xl">
                <Link href="/contact">立即咨询</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 shadow-xl"
              >
                <Link href="/services">了解服务</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">核心服务</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              为企业提供全方位的专业服务，助力品牌成长
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full premium-card shine-effect">
                  <CardContent className="p-8">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6 shadow-premium`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/services">查看全部服务 →</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              准备好开始您的品牌之旅了吗？
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto text-white/90">
              让我们一起创造非凡，为您的品牌注入新的活力
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg h-14 px-8 shadow-xl"
              >
                <Link href="/contact">立即咨询</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 shadow-xl bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Link href="/posts">查看案例</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
