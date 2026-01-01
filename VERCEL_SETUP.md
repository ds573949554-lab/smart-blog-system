# Vercel 环境变量配置指南

## ⚠️ 重要：AI 聊天机器人账户余额不足

**当前状态**：API Key 已配置，但智谱 AI 账户余额不足，无法正常使用。

**错误信息**：`余额不足或无可用资源包,请充值。`

需要前往智谱 AI 控制台充值才能恢复服务。

### 修复步骤：

1. **充值智谱 AI 账户**
   - 访问：https://open.bigmodel.cn/
   - 登录账号
   - 进入"账户中心" → "余额充值"
   - 选择充值金额并完成支付
   - 充值成功后，API 服务会自动恢复

2. **（如需更换 API Key）获取新的智谱 AI API Key**
   - 访问：https://open.bigmodel.cn/
   - 注册/登录账号
   - 进入"API Keys"页面
   - 创建新的 API Key
   - 复制 API Key（只显示一次，请妥善保存）

3. **（可选）在 Vercel 更新环境变量**
   - 如果更换了新的 API Key，需要更新：
   - 访问：https://vercel.com/ds573949554-labs-projects/smart-blog-system/settings/environment-variables
   - 或：Vercel Dashboard → 选择项目 → Settings → Environment Variables
   - 找到 `ZHIPU_API_KEY` → 点击 "Edit"
   - 填写新的 API Key
   - **Environment**: 全选（Production, Preview, Development）
   - 点击 "Save"

4. **（如果更新了环境变量）重新部署**
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
