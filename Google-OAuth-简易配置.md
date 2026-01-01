# 🎯 Google OAuth 超简单配置步骤

## 第1步：创建项目（1分钟）

打开：https://console.cloud.google.com/projectcreate

- **Project name（项目名称）** 填写：`双铭策划博客`
- 点击 **"CREATE"** 蓝色按钮
- 等待项目创建完成（约10秒）

---

## 第2步：配置 OAuth 同意屏幕（2分钟）

创建完项目后，会自动跳转。找到左侧菜单：

1. 点击左上角 **☰** 菜单图标
2. 找到并点击 **"APIs & Services"**（API 和服务）
3. 点击 **"OAuth consent screen"**（OAuth 同意屏幕）

### 填写表单：

**User Type（用户类型）**：
- 选择 **"External"**（外部）
- 点击 **"CREATE"** 按钮

**App information（应用信息）**：
- **App name**: `双铭策划博客`
- **User support email**: 选择你的邮箱
- **Developer contact information**: 填写你的邮箱

其他都不用填！

- 点击底部 **"SAVE AND CONTINUE"** 按钮
- 再点击 **"SAVE AND CONTINUE"** 按钮（跳过 Scopes）
- 再点击 **"SAVE AND CONTINUE"** 按钮（跳过 Test users）
- 点击 **"BACK TO DASHBOARD"** 返回

---

## 第3步：创建 OAuth 凭证（2分钟）

1. 左侧菜单点击 **"Credentials"**（凭据）
2. 点击顶部 **"+ CREATE CREDENTIALS"** 按钮
3. 选择 **"OAuth client ID"**

### 填写表单：

**Application type（应用类型）**：
- 选择 **"Web application"**（网页应用）

**Name（名称）**：
- 填写：`双铭策划博客`

**Authorized redirect URIs（授权重定向 URI）**：
- 点击 **"+ ADD URI"** 按钮
- 填写：`http://localhost:3000/api/auth/callback/google`

- 点击 **"CREATE"** 蓝色按钮

---

## 第4步：复制凭证（30秒）

创建成功后会弹出窗口显示：

- **Your Client ID**: 一串很长的字符（复制它！）
- **Your Client Secret**: 一串字符（复制它！）

**立即复制这两个值！**

然后把它们告诉我，我会帮你填写到配置文件中。

---

## 🎉 完成！

配置完成后，你的网站就同时支持 GitHub 和 Google 登录了！

需要帮助？随时叫我！
