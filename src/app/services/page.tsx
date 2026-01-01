'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    id: 'strategy',
    title: '战略策划',
    icon: '🎯',
    description: '为企业提供全方位的战略规划服务',
    color: 'from-blue-500 to-cyan-500',
    features: [
      '品牌战略规划',
      '市场定位分析',
      '竞争策略制定',
      '商业模式设计',
      '增长战略咨询',
    ],
  },
  {
    id: 'branding',
    title: '品牌设计',
    icon: '🎨',
    description: '打造独特的品牌形象，提升品牌价值',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Logo & VI 设计',
      '品牌形象系统',
      '包装设计',
      '宣传物料设计',
      '品牌视觉升级',
    ],
  },
  {
    id: 'marketing',
    title: '营销推广',
    icon: '📈',
    description: '精准的市场定位，高效的推广策略',
    color: 'from-orange-500 to-red-500',
    features: [
      '整合营销策划',
      '社交媒体运营',
      '内容营销',
      '活动策划执行',
      '广告投放优化',
    ],
  },
  {
    id: 'digital',
    title: '数字化解决方案',
    icon: '💻',
    description: '前沿技术赋能，助力企业数字化转型',
    color: 'from-green-500 to-emerald-500',
    features: [
      '企业官网建设',
      '电商平台搭建',
      '移动应用开发',
      '数据分析系统',
      '智能营销工具',
    ],
  },
];

const process = [
  {
    step: '01',
    title: '需求沟通',
    description: '深入了解您的需求和目标',
  },
  {
    step: '02',
    title: '方案制定',
    description: '制定专属的解决方案',
  },
  {
    step: '03',
    title: '创意设计',
    description: '创意团队精心设计',
  },
  {
    step: '04',
    title: '执行落地',
    description: '高效执行，确保质量',
  },
  {
    step: '05',
    title: '持续优化',
    description: '持续跟进，不断优化',
  },
];

export default function ServicesPage() {
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
              服务项目
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              为企业提供全方位的专业服务，从战略规划到品牌设计，
              从营销推广到数字化转型，助力企业全面发展
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
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-4xl mb-6 shadow-lg`}
                    >
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground mb-4">
                        核心服务：
                      </h3>
                      {service.features.map((feature, idx) => (
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">服务流程</h2>
            <p className="text-xl text-muted-foreground">
              专业的流程，确保项目高质量交付
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-8 -translate-y-1/2 -translate-x-4">
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
              让我们开始合作
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              无论您需要哪种服务，我们都能为您提供专业的解决方案
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg h-14 px-8 shadow-xl"
            >
              <Link href="/contact">立即咨询</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
export { metadata } from "./metadata";
