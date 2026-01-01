'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: '邓志铭',
    role: '联合创始人 & 项目总监',
    avatar: '👨‍💼',
    bio: '10年策划行业经验，曾服务多家知名企业，擅长战略规划与项目管理',
    skills: ['战略策划', '项目管理', '商业模式设计'],
  },
  {
    name: '邓憬辰',
    role: '联合创始人 & 项目经理',
    avatar: '👨‍💻',
    bio: '资深项目经理，PMP认证，确保每个项目高质量交付',
    skills: ['项目管理', '客户沟通', '流程优化'],
  },
  {
    name: '李华',
    role: '创意总监',
    avatar: '👩‍🎨',
    bio: '资深设计师，擅长品牌视觉设计',
    skills: ['品牌设计', 'VI设计', '创意策划'],
  },
  {
    name: '王强',
    role: '营销总监',
    avatar: '👨‍💻',
    bio: '数字营销专家，精通全渠道营销',
    skills: ['数字营销', '社交媒体', '数据分析'],
  },
  {
    name: '陈杰',
    role: '技术总监',
    avatar: '👨‍💻',
    bio: '全栈开发专家，引领数字化转型',
    skills: ['Web开发', '移动开发', '系统架构'],
  },
  {
    name: '赵敏',
    role: '内容策划',
    avatar: '👩‍✍️',
    bio: '内容营销专家，擅长品牌故事讲述',
    skills: ['内容策划', '文案撰写', 'SEO优化'],
  },
];

const culture = [
  {
    icon: '🎯',
    title: '目标导向',
    description: '以结果为导向，追求卓越品质',
  },
  {
    icon: '🤝',
    title: '团队协作',
    description: '开放沟通，高效协作，共同成长',
  },
  {
    icon: '💡',
    title: '持续创新',
    description: '鼓励创新思维，拥抱变化',
  },
  {
    icon: '📚',
    title: '终身学习',
    description: '不断学习，保持行业领先',
  },
];

export default function TeamPage() {
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
              团队介绍
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              汇聚行业精英，用专业和热情为客户创造价值
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">核心团队</h2>
            <p className="text-xl text-muted-foreground">
              经验丰富的专业团队，为您提供优质服务
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="text-8xl mb-6 inline-block"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {member.avatar}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">{member.role}</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">团队文化</h2>
            <p className="text-xl text-muted-foreground">
              我们坚信的价值观和工作方式
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {culture.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-6xl mb-6">🚀</div>
                  <h2 className="text-4xl font-bold mb-6">加入我们</h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    我们一直在寻找有才华、有激情的人才。
                    如果你对策划、设计或营销充满热情，欢迎加入我们的团队！
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      联系我们
                    </a>
                    <a
                      href="mailto:shuangmingd2@gmail.com"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                    >
                      发送简历
                    </a>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
