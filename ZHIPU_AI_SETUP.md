# 🤖 智谱 AI 内容生成配置指南

## 📋 功能说明
在"发布新文章"页面，输入标题后点击"🤖 AI 自动生成"按钮，系统会使用智谱 AI（GLM-4-Flash）自动生成高质量的 Markdown 文章内容。

---

## 🔑 第一步：获取智谱 AI API Key

### 1. 注册智谱 AI 账号
访问：https://open.bigmodel.cn/

### 2. 创建 API Key
1. 登录后，进入"API Keys"页面
2. 点击"创建新的 API Key"
3. 复制生成的 API Key（类似：`1234567890abcdef.1234567890abcdef`）

### 3. 查看额度
- 新用户有免费额度
- GLM-4-Flash 模型价格便宜（约 ¥0.0001/千tokens）

---

## ⚙️ 第二步：配置环境变量

### 本地开发环境

编辑项目根目录的 `.env` 文件，添加：

```env
# 智谱 AI
ZHIPU_API_KEY="你的API Key"
```

**示例：**
```env
# Database
DATABASE_URL="file:./dev.db"

# 智谱 AI
ZHIPU_API_KEY="1234567890abcdef.1234567890abcdef"

# Next Auth
NEXTAUTH_SECRET="dev-secret-key-change-in-production"
```

### 生产环境（Vercel）

使用 Vercel CLI 添加环境变量：

```bash
npx vercel env add ZHIPU_API_KEY
```

按提示操作：
1. 选择环境：`Production, Preview, Development`（全选）
2. 输入 API Key
3. 确认

或者在 Vercel Dashboard 中添加：
1. 访问：https://vercel.com/ds573949554-labs-projects/smart-blog-system/settings/environment-variables
2. 点击"Add"
3. Name: `ZHIPU_API_KEY`
4. Value: 你的 API Key
5. Environment: 全选（Production + Preview + Development）
6. Save

---

## 🧪 第三步：测试功能

### 本地测试

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问：http://localhost:3000/posts/new

3. 测试步骤：
   - 输入标题：`粤语文化`
   - 点击"🤖 AI 自动生成"按钮
   - 等待 3-5 秒
   - 内容框会自动填充 AI 生成的文章

### 预期效果

生成的内容格式：
```markdown
# 粤语文化

## 简介
粤语是汉语的一种重要方言...

## 历史渊源
粤语的历史可以追溯到...

## 主要特点
- 保留古汉语发音
- 声调丰富（9个声调）
- 词汇独特

## 总结
粤语不仅是一种语言...
```

---

## 📊 使用流程

1. **输入标题**
   - 在"标题"输入框输入文章标题（中文/英文都可以）

2. **自动生成 Slug**（可选）
   - 点击 Slug 旁边的"自动生成"
   - 中文标题会自动转换为拼音

3. **AI 生成内容**
   - 点击"🤖 AI 自动生成"按钮
   - 按钮变为"生成中..."
   - 等待 3-5 秒
   - 内容自动填充

4. **编辑和发布**
   - 可以手动修改 AI 生成的内容
   - 点击"发布文章"保存到数据库

---

## 🛠️ 技术细节

### 使用的模型
- **模型名称**：GLM-4-Flash
- **特点**：快速响应、成本低、质量高
- **速度**：通常 3-5 秒返回结果

### API 调用参数
```typescript
{
  model: 'glm-4-flash',
  temperature: 0.7,  // 控制创造性（0-1）
  top_p: 0.9,        // 控制多样性
  messages: [...]
}
```

### 生成提示词
系统会自动构建以下提示：
```
你是一个专业的文章写作助手。请根据用户提供的标题，生成一篇结构完整、内容丰富的 Markdown 格式文章。文章应包含：标题、简介、多个小节（使用 ## 二级标题）、要点列表、总结等。字数控制在 500-800 字左右。

请为以下标题生成一篇高质量的 Markdown 文章：

标题：{你输入的标题}
```

---

## 🔧 故障排除

### 问题 1：点击按钮无反应
**检查**：
- 是否已输入标题？
- 浏览器控制台有错误吗？

### 问题 2："未配置 ZHIPU_API_KEY"
**解决**：
- 检查 `.env` 文件是否正确添加了 ZHIPU_API_KEY
- 重启开发服务器（Ctrl+C 然后 npm run dev）

### 问题 3："智谱 AI API 调用失败"
**检查**：
- API Key 是否正确？
- 是否有网络连接？
- 智谱 AI 账户是否有余额？

### 问题 4：生成内容为空
**原因**：
- API 响应异常
- 模型返回空内容

**解决**：
- 查看浏览器控制台错误信息
- 尝试重新生成
- 检查智谱 AI 控制台的调用日志

---

## 💰 费用说明

### GLM-4-Flash 定价
- 输入：¥0.0001/千tokens
- 输出：¥0.0001/千tokens

### 示例成本
生成一篇 800 字文章：
- 输入 tokens：约 50（标题+提示词）
- 输出 tokens：约 1000（文章内容）
- 总成本：约 ¥0.0001

**结论**：非常便宜！生成 100 篇文章 < ¥0.01

---

## 🚀 后续优化建议

### 1. 自定义提示词
修改 `src/app/api/generate-content/route.ts` 中的 system prompt：
```typescript
content: '你是一个专业的{领域}写作助手...'
```

### 2. 添加文章风格选择
前端添加下拉菜单：
- 正式风格
- 轻松风格
- 技术风格
- 故事风格

### 3. 支持多语言
生成时指定语言：
```typescript
content: `请用${language}生成文章...`
```

### 4. 添加字数控制
前端添加输入框：
- 短文（300-500字）
- 中文（500-1000字）
-长文（1000-2000字）

---

## 📝 快速启动清单

- [ ] 注册智谱 AI 账号
- [ ] 获取 API Key
- [ ] 添加到本地 `.env` 文件
- [ ] 添加到 Vercel 环境变量
- [ ] 重启开发服务器
- [ ] 测试生成功能
- [ ] 推送代码并部署

---

**准备好了吗？按照上面的步骤配置，然后就可以用 AI 自动生成文章啦！** 🎉
