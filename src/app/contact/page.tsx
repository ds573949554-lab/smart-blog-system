'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contactInfo = [
  {
    icon: '📍',
    title: '公司地址',
    content: '广东省广州市天河区珠江新城XXX大厦18楼',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '📞',
    title: '联系电话',
    content: '+86 400-888-8888',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📧',
    title: '电子邮箱',
    content: 'contact@shuangming.com',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: '⏰',
    title: '工作时间',
    content: '周一至周五 9:00-18:00',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              联系我们
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              期待与您合作，让我们一起创造非凡
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}
                    >
                      {info.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-10">
                  <h2 className="text-3xl font-bold mb-6 text-center">在线咨询</h2>
                  <p className="text-center text-muted-foreground mb-8">
                    填写表单，我们将在24小时内与您联系
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名 *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">公司名称</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="请输入公司名称"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">电子邮箱 *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="example@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">联系电话 *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="请输入联系电话"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">感兴趣的服务</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        <option value="">请选择服务类型</option>
                        <option value="strategy">战略策划</option>
                        <option value="branding">品牌设计</option>
                        <option value="marketing">营销推广</option>
                        <option value="digital">数字化解决方案</option>
                        <option value="other">其他</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">留言内容 *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="请详细描述您的需求..."
                        rows={6}
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                      >
                        ✓ 提交成功！我们会尽快与您联系。
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '提交中...' : '提交咨询'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-muted-foreground">
                      地图展示区域
                      <br />
                      <span className="text-sm">（可集成第三方地图服务）</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
export { metadata } from "./metadata";
