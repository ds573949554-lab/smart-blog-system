# Vercel 环境变量配置指南

## ⚠️ 重要：AI 聊天机器人需要配置 API Key

目前 AI 聊天机器人无法工作，因为缺少 `ZHIPU_API_KEY` 环境变量。

### 配置步骤：

1. **获取智谱 AI API Key**
   - 访问：https://open.bigmodel.cn/
   - 注册/登录账号
   - 进入"API Keys"页面
   - 创建新的 API Key
   - 复制 API Key（只显示一次，请妥善保存）

2. **在 Vercel 配置环境变量**
   - 访问：https://vercel.com/ds573949554-labs-projects/smart-blog-system/settings/environment-variables
   - 或：Vercel Dashboard → 选择项目 → Settings → Environment Variables
   - 点击 "Add New"
   - 填写：
     - **Name**: `ZHIPU_API_KEY`
     - **Value**: 粘贴你的 API Key
     - **Environment**: 选择 `Production`, `Preview`, `Development` (全选)
   - 点击 "Save"

3. **重新部署**
   - 方式1：在 Vercel Dashboard → Deployments → 点击最新部署的 "..." → "Redeploy"
   - 方式2：推送新的代码到 GitHub（会自动触发部署）

### 验证配置

部署完成后，访问网站并点击右下角的聊天机器人图标，发送消息测试是否正常工作。

### 本地开发

如果需要在本地测试 AI 聊天功能：

1. 复制 `.env.example` 为 `.env.local`
2. 填写你的 `ZHIPU_API_KEY`
3. 运行 `npm run dev`

---

## 其他环境变量

### DATABASE_URL
- 用途：PostgreSQL 数据库连接
- 已配置：✅ (Neon Database)

### VERCEL_OIDC_TOKEN
- 用途：Vercel 自动生成的认证令牌
- 无需手动配置
