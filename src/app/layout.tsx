import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import {
  ZCOOL_XiaoWei,
  ZCOOL_QingKe_HuangYou,
  ZCOOL_KuaiLe,
  Liu_Jian_Mao_Cao,
  Zhi_Mang_Xing,
  Noto_Serif_SC
} from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/Provider";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { TopBanner } from "@/components/TopBanner";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
import { AIChat } from "@/components/AIChat";

// 🎨 字体方案1：站酷小薇 - 优雅清新，适合文化创意
const zCoolXiaoWei = ZCOOL_XiaoWei({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-1",
  display: "swap",
});

// 🎨 字体方案2：站酷庆科黄油体 - 可爱圆润，年轻活力
const zCoolHuangYou = ZCOOL_QingKe_HuangYou({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-2",
  display: "swap",
});

// 🎨 字体方案3：站酷快乐体 - 欢快活泼，充满创意
const zCoolKuaiLe = ZCOOL_KuaiLe({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-3",
  display: "swap",
});

// 🎨 字体方案4：刘建毛草 - 潇洒草书，艺术气息浓厚
const liuJianMaoCao = Liu_Jian_Mao_Cao({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-4",
  display: "swap",
});

// 🎨 字体方案5：志莽星 - 手写涂鸦，个性张扬
const zhiMangXing = Zhi_Mang_Xing({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-5",
  display: "swap",
});

// 当前使用的字体（改这里切换字体）
const currentBrandFont = zCoolKuaiLe; // 👈 站酷快乐体 - 活泼欢快
const artFont = zCoolKuaiLe; // 👈 站酷快乐体 - 艺术活泼

// 优雅衬线字体 - 用于副标题
const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Footer懒加载 - 非首屏关键组件
const Footer = dynamic(() => import("@/components/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-96" />,
  ssr: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  // 支持横屏和竖屏
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    template: "%s | 双铭策划合伙公司",
    default: "双铭策划合伙公司 - 专业策划与品牌设计",
  },
  description: "双铭策划合伙公司专注于为企业提供专业的策划、设计和营销服务，助力品牌成长，创造商业价值。",
  keywords: ["策划", "品牌设计", "营销推广", "数字化解决方案", "企业服务", "双铭策划"],
  authors: [{ name: "双铭策划团队" }],
  openGraph: {
    title: "双铭策划合伙公司",
    description: "专业策划与品牌设计服务",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${currentBrandFont.variable} ${notoSerifSC.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <I18nProvider>
            <TRPCProvider>
              <WebVitalsReporter />
              <Navbar />
              <TopBanner />
              <main className="pt-28">{children}</main>
              <Footer />
              <AIChat />
            </TRPCProvider>
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
