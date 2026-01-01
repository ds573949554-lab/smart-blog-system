# OAuth 社交登录配置指南

本文档介绍如何配置 GitHub 和 Google OAuth 登录。

## 前置准备

1. 生成 NextAuth 密钥：
```bash
openssl rand -base64 32
```

将生成的密钥添加到 `.env` 文件的 `NEXTAUTH_SECRET` 变量中。

## GitHub OAuth 配置

### 1. 创建 GitHub OAuth 应用

1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写以下信息：
   - **Application name**: 双铭策划博客系统（或任意名称）
   - **Homepage URL**:
     - 本地开发：`http://localhost:3000`
     - 生产环境：`https://your-domain.com`
   - **Authorization callback URL**:
     - 本地开发：`http://localhost:3000/api/auth/callback/github`
     - 生产环境：`https://your-domain.com/api/auth/callback/github`
4. 点击 "Register application"

### 2. 获取凭证

1. 在应用详情页，复制 **Client ID**
2. 点击 "Generate a new client secret"，复制生成的 **Client Secret**
3. 将这些值添加到 `.env` 文件：

```env
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

## Google OAuth 配置

### 1. 创建 Google Cloud 项目

1. 访问 https://console.cloud.google.com/
2. 点击顶部的项目下拉菜单，选择 "New Project"
3. 输入项目名称（如 "双铭策划博客"），点击 "Create"

### 2. 启用 Google+ API

1. 在左侧菜单选择 "APIs & Services" > "Library"
2. 搜索 "Google+ API"
3. 点击进入并启用

### 3. 配置 OAuth 同意屏幕

1. 在左侧菜单选择 "OAuth consent screen"
2. 选择 "External"（外部用户）
3. 填写必要信息：
   - **App name**: 双铭策划博客系统
   - **User support email**: 你的邮箱
   - **Developer contact information**: 你的邮箱
4. 点击 "Save and Continue"
5. Scopes 页面直接点击 "Save and Continue"
6. Test users 页面直接点击 "Save and Continue"

### 4. 创建 OAuth 凭证

1. 在左侧菜单选择 "Credentials"
2. 点击 "Create Credentials" > "OAuth client ID"
3. 选择 "Web application"
4. 填写以下信息：
   - **Name**: 双铭策划博客（或任意名称）
   - **Authorized JavaScript origins**:
     - 本地开发：`http://localhost:3000`
     - 生产环境：`https://your-domain.com`
   - **Authorized redirect URIs**:
     - 本地开发：`http://localhost:3000/api/auth/callback/google`
     - 生产环境：`https://your-domain.com/api/auth/callback/google`
5. 点击 "Create"

### 5. 获取凭证

1. 复制 **Client ID** 和 **Client secret**
2. 将这些值添加到 `.env` 文件：

```env
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

## Vercel 部署配置

在 Vercel 项目设置中添加环境变量：

1. 进入项目设置 > Environment Variables
2. 添加以下变量：
   - `NEXTAUTH_URL`: `https://your-domain.vercel.app`
   - `NEXTAUTH_SECRET`: （使用上面生成的密钥）
   - `GITHUB_CLIENT_ID`: （GitHub 应用的 Client ID）
   - `GITHUB_CLIENT_SECRET`: （GitHub 应用的 Client Secret）
   - `GOOGLE_CLIENT_ID`: （Google 应用的 Client ID）
   - `GOOGLE_CLIENT_SECRET`: （Google 应用的 Client Secret）

⚠️ **重要**: 部署到生产环境时，需要：
1. 在 GitHub OAuth App 中添加生产环境的回调 URL
2. 在 Google OAuth Client 中添加生产环境的重定向 URI
3. 使用 HTTPS（必须）

## 测试登录

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问 http://localhost:3000
3. 点击导航栏中的"登录"按钮
4. 选择 GitHub 或 Google 登录
5. 授权后应该能看到你的头像和用户名

## 常见问题

### 1. "redirect_uri_mismatch" 错误

**原因**: 回调 URL 配置不正确

**解决方案**:
- 确保 OAuth 应用中的回调 URL 与你的应用完全一致（包括 http/https 和端口）
- 本地开发使用 `http://localhost:3000`
- 生产环境必须使用 `https://your-domain.com`

### 2. Google 登录显示 "Access blocked"

**原因**: OAuth 同意屏幕未配置或应用未发布

**解决方案**:
- 确保在 OAuth consent screen 中填写了所有必要信息
- 开发测试时，将测试账号添加到 "Test users" 列表中

### 3. 本地开发时 session 丢失

**原因**: NEXTAUTH_SECRET 未配置

**解决方案**:
- 确保 `.env` 文件中有 `NEXTAUTH_SECRET`
- 重启开发服务器

## 安全建议

1. ❌ **永远不要**将 `.env` 文件提交到 Git
2. ✅ 定期更换 `NEXTAUTH_SECRET`
3. ✅ 使用环境变量管理敏感信息
4. ✅ 生产环境必须使用 HTTPS
5. ✅ 限制 OAuth 应用的回调 URL 只包含你的域名
