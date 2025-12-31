import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/Provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Blog System",
    default: "Smart Blog System - 全栈博客系统",
  },
  description: "使用 Next.js 15 + tRPC + Prisma 构建的现代化全栈博客系统",
  keywords: ["博客", "Next.js", "tRPC", "Prisma", "TypeScript", "全栈开发"],
  authors: [{ name: "Smart Blog Team" }],
  openGraph: {
    title: "Smart Blog System",
    description: "现代化全栈博客系统",
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
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
