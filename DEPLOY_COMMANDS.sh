#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "           🚀 Smart Blog System - 部署到 GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "GitHub 用户名: ds573949554-lab"
echo "项目目录: $(pwd)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 第一步：创建 GitHub 仓库（手动操作）
echo "【第1步】创建 GitHub 仓库"
echo ""
echo "请在浏览器中打开以下链接："
echo "👉 https://github.com/new"
echo ""
echo "填写以下信息："
echo "  Repository name: smart-blog-system"
echo "  Description: 基于 Next.js 15 + tRPC + Prisma 的现代化全栈博客系统"
echo "  Public ✓"
echo ""
echo "⚠️  重要：不要勾选任何初始化选项！"
echo ""
echo "按 Enter 继续（创建完仓库后）..."
read

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "【第2步】添加远程仓库"
echo ""

# 添加远程仓库
git remote add origin https://github.com/ds573949554-lab/smart-blog-system.git 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ 远程仓库添加成功！"
else
    echo "ℹ️  远程仓库已存在，更新 URL..."
    git remote set-url origin https://github.com/ds573949554-lab/smart-blog-system.git
    echo "✅ 远程仓库 URL 已更新！"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "【第3步】推送代码到 GitHub"
echo ""

# 推送代码
echo "正在推送代码..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ 代码推送成功！"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "GitHub 仓库地址："
    echo "👉 https://github.com/ds573949554-lab/smart-blog-system"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "【下一步】部署到 Vercel"
    echo ""
    echo "1. 打开浏览器访问："
    echo "   👉 https://vercel.com"
    echo ""
    echo "2. 使用 GitHub 账号登录"
    echo ""
    echo "3. 点击 'Add New...' → 'Project'"
    echo ""
    echo "4. 选择 'smart-blog-system' 仓库"
    echo ""
    echo "5. 配置环境变量："
    echo "   变量名: DATABASE_URL"
    echo "   变量值: 你的数据库连接字符串"
    echo ""
    echo "   推荐免费数据库："
    echo "   • Vercel Postgres (推荐)"
    echo "   • Neon: https://neon.tech"
    echo "   • Supabase: https://supabase.com"
    echo ""
    echo "6. 点击 'Deploy' 按钮"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 部署完成后，你将获得："
    echo ""
    echo "✨ 自动部署的网站"
    echo "✨ 全球 CDN 加速"
    echo "✨ 免费 HTTPS"
    echo "✨ 每次推送自动更新"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo ""
    echo "❌ 推送失败！可能需要认证。"
    echo ""
    echo "请按照以下步骤操作："
    echo ""
    echo "1. 创建 Personal Access Token："
    echo "   访问: https://github.com/settings/tokens/new"
    echo "   勾选 'repo' 权限"
    echo "   生成并复制 token"
    echo ""
    echo "2. 重新设置远程 URL（用 token 替换 YOUR_TOKEN）："
    echo "   git remote set-url origin https://YOUR_TOKEN@github.com/ds573949554-lab/smart-blog-system.git"
    echo ""
    echo "3. 再次推送："
    echo "   git push -u origin main"
    echo ""
fi

