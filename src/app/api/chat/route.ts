import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '消息不能为空' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI 服务未配置' },
        { status: 500 }
      );
    }

    // 调用智谱 AI API (GLM-4-Plus)
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-plus',
        messages: [
          {
            role: 'system',
            content: `你是双铭策划合伙公司的AI客服助手。

公司信息：
- 公司名称：双铭策划合伙公司
- 地址：美国纽约皇后区53rd 90
- LinkedIn: linkedin.com/in/shuangmingd2
- 邮箱：shuangmingd2@gmail.com
- 工作时间：周一至周五 9:00-18:00 (美东时间)

团队成员：
- 邓志铭：联合创始人 & 项目总监
- 邓憬辰：联合创始人 & 项目经理

核心服务：
1. 战略策划 - 市场定位分析、竞争策略制定、品牌战略规划
2. 品牌设计 - LOGO设计、VI系统、品牌形象包装
3. 营销推广 - 数字营销、社交媒体运营、内容营销
4. 数字化解决方案 - 网站开发、移动应用、电商平台
5. AI 团队系统 - 14天0-1实施方案，¥700/月运营成本，年收入目标¥870,000

请用专业、友好的态度回答客户咨询。如果客户想了解更多或预约咨询，引导他们：
- 访问 /contact 页面填写咨询表单
- 发送邮件到 shuangmingd2@gmail.com
- 访问 LinkedIn: linkedin.com/in/shuangmingd2

回答请简洁明了，一般控制在 100-150 字以内。`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('智谱 AI API 错误:', errorData);
      return NextResponse.json(
        { error: 'AI 服务暂时不可用' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || '抱歉，我现在无法回答。请稍后再试或直接联系我们的团队。';

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('AI 聊天错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}
