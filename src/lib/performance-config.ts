/**
 * 性能优化配置
 */

// 需要预渲染的路由
export const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/services',
  '/team',
  '/contact',
  '/posts',
];

// 动态路由配置
export const DYNAMIC_ROUTES = {
  '/posts/[slug]': {
    revalidate: 3600, // 1小时重新验证
  },
};

// Link组件预加载配置
export const LINK_PREFETCH_CONFIG = {
  // 首页重要链接 - 立即预加载
  high: ['/about', '/services', '/contact'],
  // 次要链接 - hover时预加载
  medium: ['/team', '/posts'],
  // 低优先级 - 不预加载
  low: ['/posts/new'],
};

// 图片优化配置
export const IMAGE_CONFIG = {
  // 图片质量
  quality: 85,
  // 支持的尺寸
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  // 图片格式
  formats: ['image/webp'],
};

// 代码分割配置
export const CODE_SPLIT_CONFIG = {
  // 懒加载的组件
  lazyComponents: ['Footer', 'ContactForm'],
  // 预加载的组件
  eagerComponents: ['Navbar'],
};

// 缓存策略
export const CACHE_CONFIG = {
  // 静态资源缓存时间（秒）
  staticAssets: 31536000, // 1年
  // API缓存时间（秒）
  api: 60, // 1分钟
  // 页面缓存时间（秒）
  pages: 3600, // 1小时
};

// 性能预算
export const PERFORMANCE_BUDGET = {
  // First Contentful Paint (ms)
  fcp: 1800,
  // Largest Contentful Paint (ms)
  lcp: 2500,
  // Cumulative Layout Shift
  cls: 0.1,
  // First Input Delay (ms)
  fid: 100,
  // Interaction to Next Paint (ms)
  inp: 200,
  // Time to First Byte (ms)
  ttfb: 800,
  // Total Blocking Time (ms)
  tbt: 200,
  // Speed Index
  si: 3400,
};

// 资源提示
export const RESOURCE_HINTS = {
  // DNS预解析
  dnsPrefetch: [],
  // 预连接
  preconnect: [],
  // 预加载关键资源
  preload: [
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  ],
};

// 第三方脚本配置
export const THIRD_PARTY_SCRIPTS = {
  // Google Analytics
  googleAnalytics: {
    id: process.env.NEXT_PUBLIC_GA_ID || '',
    strategy: 'afterInteractive' as const,
  },
  // 其他第三方脚本
  // ...
};
