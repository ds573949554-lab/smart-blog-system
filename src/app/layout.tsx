import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/Provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TRPCProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </TRPCProvider>
      </body>
    </html>
  );
}
