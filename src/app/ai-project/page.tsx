"use client"

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/I18nContext'

export default function AIProjectPage() {
  const { t } = useI18n()

  // 阶段颜色配置
  const phaseColors = ['from-blue-600 to-indigo-600', 'from-purple-600 to-pink-600', 'from-orange-600 to-red-600']

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
              <span className="text-blue-200 text-xs md:text-sm font-medium">{t.aiProject.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t.aiProject.title}
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-gradient-text">
                {t.aiProject.subtitle}
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto mb-8 leading-relaxed px-4">
              {t.aiProject.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">14 天</div>
                <div className="text-xs md:text-sm text-blue-200">{t.aiProject.stats.days}</div>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">10 位</div>
                <div className="text-xs md:text-sm text-blue-200">{t.aiProject.stats.agents}</div>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
                <div className="text-xs md:text-sm text-blue-200">{t.aiProject.stats.tools}</div>
              </div>
              <div className="px-4 py-3 md:px-6 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white">¥700</div>
                <div className="text-xs md:text-sm text-blue-200">{t.aiProject.stats.cost}</div>
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
            <h2 className="text-4xl font-bold text-white mb-4">{t.aiProject.roadmapTitle}</h2>
            <p className="text-blue-200 text-lg">{t.aiProject.roadmapSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.aiProject.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                     style={{ background: `linear-gradient(135deg, ${phaseColors[index].split(' ')[1]}, ${phaseColors[index].split(' ')[3]})` }} />
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 md:p-8 h-full hover:border-white/40 transition-all duration-300">
                  <div className={`inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r ${phaseColors[index]} text-white text-xs md:text-sm font-semibold mb-4`}>
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
              <h3 className="text-3xl font-bold text-white mb-6">{t.aiProject.budgetTitle}</h3>
              <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                  <h4 className="text-white font-semibold">{t.aiProject.optimizedCost}</h4>
                </div>
                <div className="p-6 space-y-4">
                  {t.aiProject.budget.map((item, index) => (
                    <div key={index} className={`pb-4 ${index !== t.aiProject.budget.length - 1 ? 'border-b border-white/25' : ''}`}>
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
              <h3 className="text-3xl font-bold text-white mb-6">{t.aiProject.revenueTitle}</h3>
              <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                  <h4 className="text-white font-semibold">{t.aiProject.annualTarget}</h4>
                </div>
                <div className="p-6 space-y-4">
                  {t.aiProject.revenue.map((item, index) => (
                    <div key={index} className={`pb-4 ${index !== t.aiProject.revenue.length - 1 ? 'border-b border-white/25' : ''}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{item.month}</span>
                        <span className="text-green-400 font-bold text-xl">{item.amount}</span>
                      </div>
                      <p className="text-blue-200 text-sm">{item.focus}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t-2 border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">{t.aiProject.roi}</span>
                      <span className="text-yellow-400 font-bold text-2xl">{t.aiProject.roiValue}</span>
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
            <h2 className="text-4xl font-bold text-white mb-4">{t.aiProject.techStackTitle}</h2>
            <p className="text-blue-200 text-lg">{t.aiProject.techStackSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {t.aiProject.techStack.map((tech, index) => (
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
              <h2 className="text-4xl font-bold text-white mb-4">{t.aiProject.ctaTitle}</h2>
              <p className="text-blue-100 text-lg mb-8">
                {t.aiProject.ctaSubtitle}
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {t.aiProject.consultNow}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
