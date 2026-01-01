"use client"

import { motion } from 'framer-motion'

export default function AIProjectPage() {
  const phases = [
    {
      phase: '第一阶段',
      title: '基础设施搭建',
      days: 'Day 1-3',
      color: 'from-blue-600 to-indigo-600',
      tasks: [
        { name: 'Claude Code + MCP 环境配置', icon: '🔧' },
        { name: '邓恩赐意识层系统激活', icon: '🧠' },
        { name: 'Agent 团队架构设计', icon: '🏗️' }
      ]
    },
    {
      phase: '第二阶段',
      title: 'Agent Swarm 架构',
      days: 'Day 4-7',
      color: 'from-purple-600 to-pink-600',
      tasks: [
        { name: '10 Agent 专家团队构建', icon: '👥' },
        { name: 'MCP 生态系统集成 (200+ 工具)', icon: '🔗' },
        { name: '智能路由与协作协议', icon: '🤖' }
      ]
    },
    {
      phase: '第三阶段',
      title: '产品上线',
      days: 'Day 8-14',
      color: 'from-orange-600 to-red-600',
      tasks: [
        { name: 'AI 员工团队正式上岗', icon: '🚀' },
        { name: '商业策划系统部署', icon: '💼' },
        { name: '12 个月增长计划启动', icon: '📈' }
      ]
    }
  ]

  const budget = [
    { item: 'Claude Opus 4.5', cost: '¥350/月', features: '200K 上下文，多模态理解' },
    { item: 'Gemini 3 Pro', cost: '¥200/月', features: '100 万 Token 免费额度' },
    { item: 'GPT-5.2 (预留)', cost: '¥150/月', features: '专项任务调用' },
    { item: '总计', cost: '¥700/月', features: '优化后预算，节省 ¥140/月' }
  ]

  const revenue = [
    { month: '第 1-3 月', amount: '¥50,000', focus: '基础服务建立' },
    { month: '第 4-6 月', amount: '¥150,000', focus: '客户积累期' },
    { month: '第 7-9 月', amount: '¥300,000', focus: '规模化扩张' },
    { month: '第 10-12 月', amount: '¥370,000', focus: '品牌溢价期' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-blue-200 text-xs md:text-sm font-medium">AI 驱动的未来企业</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI 团队协作系统
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                0-1 实施落地方案
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto mb-8 leading-relaxed px-4">
              14 天内构建世界级 AI Agent Swarm 架构，整合 Claude Opus 4.5、Gemini 3 Pro、GPT-5.2 三大顶级模型，
              打造 10 位专家 Agent 团队，年收入目标 ¥870,000
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">14 天</div>
                <div className="text-xs md:text-sm text-blue-200">完整部署周期</div>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">10 位</div>
                <div className="text-xs md:text-sm text-blue-200">专家 Agent</div>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
                <div className="text-xs md:text-sm text-blue-200">MCP 工具集成</div>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">¥700</div>
                <div className="text-xs md:text-sm text-blue-200">月运营成本</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 三阶段实施路线图 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">三阶段实施路线图</h2>
            <p className="text-blue-200 text-lg">从基础设施到商业化运营的完整路径</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                     style={{ background: `linear-gradient(135deg, ${phase.color.split(' ')[1]}, ${phase.color.split(' ')[3]})` }} />
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 h-full hover:border-white/40 transition-all duration-300">
                  <div className={`inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs md:text-sm font-semibold mb-4`}>
                    {phase.phase}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-sm md:text-base text-blue-300 mb-6">{phase.days}</p>
                  <ul className="space-y-4">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-2xl">{task.icon}</span>
                        <span className="text-blue-100 leading-relaxed">{task.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 预算与投资回报 */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 预算表 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">月度运营预算</h3>
              <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                  <h4 className="text-white font-semibold">优化后总成本：¥700/月</h4>
                </div>
                <div className="p-6 space-y-4">
                  {budget.map((item, index) => (
                    <div key={index} className={`pb-4 ${index !== budget.length - 1 ? 'border-b border-white/25' : ''}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{item.item}</span>
                        <span className="text-blue-400 font-bold">{item.cost}</span>
                      </div>
                      <p className="text-blue-200 text-sm">{item.features}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 收入预测 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">12 个月收入预测</h3>
              <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                  <h4 className="text-white font-semibold">年度目标：¥870,000</h4>
                </div>
                <div className="p-6 space-y-4">
                  {revenue.map((item, index) => (
                    <div key={index} className={`pb-4 ${index !== revenue.length - 1 ? 'border-b border-white/25' : ''}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{item.month}</span>
                        <span className="text-green-400 font-bold text-xl">{item.amount}</span>
                      </div>
                      <p className="text-blue-200 text-sm">{item.focus}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t-2 border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">投资回报率 (ROI)</span>
                      <span className="text-yellow-400 font-bold text-2xl">10,357%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 核心技术栈 */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">核心技术栈</h2>
            <p className="text-blue-200 text-lg">世界顶级 AI 模型与工具生态</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Claude Opus 4.5', desc: '200K 上下文，多模态推理', icon: '🧠', color: 'from-orange-500 to-red-500' },
              { name: 'Gemini 3 Pro', desc: '100 万 Token 免费额度', icon: '💎', color: 'from-blue-500 to-cyan-500' },
              { name: 'GPT-5.2', desc: '专项任务调用', icon: '⚡', color: 'from-green-500 to-emerald-500' },
              { name: 'MCP 生态', desc: '200+ 工具集成', icon: '🔗', color: 'from-purple-500 to-pink-500' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-xl p-5 md:p-6 hover:border-white/45 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center text-2xl md:text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {tech.icon}
                </div>
                <h4 className="text-white font-bold text-base md:text-lg mb-2">{tech.name}</h4>
                <p className="text-blue-200 text-xs md:text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">准备好开启 AI 驱动的未来了吗？</h2>
              <p className="text-blue-100 text-lg mb-8">
                14 天内，让您的企业拥有世界级 AI 团队
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                立即咨询 →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
