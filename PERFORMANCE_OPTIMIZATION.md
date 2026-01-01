# 性能优化建议指南

## 📊 当前性能状态

### 已实现的优化
- ✅ Next.js App Router（自动代码分割）
- ✅ Framer Motion（动画性能优化）
- ✅ Tailwind CSS（生产环境自动purge）
- ✅ TypeScript（类型安全，减少运行时错误）
- ✅ tRPC（类型安全的API调用）

---

## 🚀 推荐的性能优化

### 1. 图片优化（高优先级）

#### 使用 Next.js Image 组件
```tsx
import Image from 'next/image';

// 替换现有的 img 标签
<Image
  src="/images/logo.png"
  alt="双铭策划Logo"
  width={200}
  height={80}
  priority  // 首屏图片使用priority
  placeholder="blur"  // 添加模糊占位符
/>
```

#### 图片格式建议
- Logo/图标: SVG 或 WebP
- 照片: WebP (优先) 或 JPEG
- 背景图: WebP + 渐变色回退

---

### 2. 字体优化

#### 使用 next/font
```tsx
// layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="zh-CN" className={inter.className}>
      {children}
    </html>
  );
}
```

---

### 3. 代码分割优化

#### 动态导入
```tsx
import dynamic from 'next/dynamic';

// 延迟加载非首屏组件
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div>Loading...</div>,
});

const ContactForm = dynamic(
  () => import('@/components/ContactForm'),
  { ssr: false }  // 客户端渲染
);
```

---

### 4. 数据预取优化

#### Link 组件预取
```tsx
<Link
  href="/services"
  prefetch={true}  // 预取页面数据
>
  了解服务
</Link>
```

---

### 5. 缓存策略

#### API 路由缓存
```ts
// app/api/posts/route.ts
export const revalidate = 60; // 60秒缓存

export async function GET() {
  const posts = await getPosts();
  return Response.json(posts);
}
```

#### 静态生成
```tsx
// 静态生成页面
export const dynamic = 'force-static';

// 增量静态再生成
export const revalidate = 3600; // 1小时
```

---

### 6. 第三方脚本优化

#### 使用 next/script
```tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js"
  strategy="afterInteractive"
/>
```

---

### 7. CSS 优化

#### 关键 CSS 内联
```tsx
// layout.tsx
import './critical.css';  // 关键CSS
```

#### 移除未使用的CSS
```bash
# Tailwind 已自动purge
# 检查其他CSS文件
npm run build
```

---

### 8. 监控和分析

#### 添加 Web Vitals 监控
```tsx
// app/layout.tsx
export function reportWebVitals(metric: any) {
  console.log(metric);
  // 发送到分析服务
}
```

#### 使用 Lighthouse
```bash
npm install -g lighthouse
lighthouse https://your-site.com
```

---

## 📈 性能指标目标

| 指标 | 当前 | 目标 | 优化方案 |
|------|------|------|----------|
| FCP | - | < 1.8s | 图片优化 + 字体优化 |
| LCP | - | < 2.5s | 图片优化 + 代码分割 |
| FID | - | < 100ms | 减少JS体积 |
| CLS | - | < 0.1 | 图片尺寸固定 |
| TTI | - | < 3.8s | 代码分割 + 预加载 |

---

## 🔍 性能分析工具

### 1. Chrome DevTools
- Performance 面板
- Network 面板
- Lighthouse 审计

### 2. Next.js 分析工具
```bash
npm run build -- --profile
npm install -g @next/bundle-analyzer
```

### 3. 在线工具
- PageSpeed Insights
- WebPageTest
- GTmetrix

---

## 💡 快速胜利优化（Quick Wins）

### 立即可实施：
1. ✅ 添加 robots.txt（已完成）
2. ✅ 添加 sitemap.xml（已完成）
3. ⏳ 压缩图片（使用 TinyPNG）
4. ⏳ 启用 GZIP 压缩（Vercel 自动）
5. ⏳ 添加 meta 描述（部分完成）

### 短期优化（1-2天）：
1. 实现图片懒加载
2. 优化字体加载
3. 代码分割优化
4. 添加 loading 状态

### 中期优化（1-2周）：
1. 实现 Service Worker
2. 添加离线支持
3. 实现数据预取
4. 优化数据库查询

---

## 🎯 优化优先级

### P0 - 必须做
- [ ] 使用 Next.js Image 组件
- [ ] 压缩所有图片
- [ ] 添加 alt 文本

### P1 - 应该做
- [ ] 字体优化
- [ ] 代码分割
- [ ] 添加 loading 状态

### P2 - 可以做
- [ ] Service Worker
- [ ] 离线支持
- [ ] 高级缓存策略

---

## 📱 移动端优化

### 响应式优化
```css
/* 移动优先 */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

### 触摸优化
```tsx
// 增大点击区域
<button className="min-h-[44px] min-w-[44px]">
  点击
</button>
```

---

## 🔒 安全优化

### Content Security Policy
```tsx
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval';",
  },
];
```

---

## 📊 优化检查清单

### 图片
- [ ] 使用 WebP 格式
- [ ] 添加懒加载
- [ ] 固定尺寸（避免CLS）
- [ ] 压缩优化

### CSS
- [ ] 移除未使用的CSS
- [ ] 内联关键CSS
- [ ] 使用CSS变量
- [ ] 避免@import

### JavaScript
- [ ] 代码分割
- [ ] Tree Shaking
- [ ] 压缩混淆
- [ ] 移除console.log

### HTML
- [ ] 语义化标签
- [ ] Meta标签完整
- [ ] 结构化数据
- [ ] 可访问性

---

**最后更新**: 2025-12-31
**预计优化收益**: 30-50% 性能提升
