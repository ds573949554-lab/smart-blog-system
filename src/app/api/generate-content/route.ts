import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: '标题不能为空' },
        { status: 400 }
      );
    }

    // 检查环境变量
    const apiKey = process.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '未配置 ZHIPU_API_KEY，请在 Vercel 环境变量中添加' },
        { status: 500 }
      );
    }

    // 调用智谱 AI API
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash', // 使用 GLM-4-Flash 模型（快速且便宜）
        messages: [
          {
            role: 'system',
            content: '你是一个专业的文章写作助手。请根据用户提供的标题，生成一篇结构完整、内容丰富的 Markdown 格式文章。文章应包含：标题、简介、多个小节（使用 ## 二级标题）、要点列表、总结等。字数控制在 500-800 字左右。'
          },
          {
            role: 'user',
            content: `请为以下标题生成一篇高质量的 Markdown 文章：\n\n标题：${title}`
          }
        ],
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('智谱 AI API 错误:', errorData);
      return NextResponse.json(
        { error: `智谱 AI API 调用失败: ${errorData.error?.message || '未知错误'}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content || '';

    if (!generatedContent) {
      return NextResponse.json(
        { error: 'AI 生成的内容为空' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: generatedContent,
      model: 'glm-4-flash',
      usage: data.usage,
    });

  } catch (error) {
    console.error('生成内容时出错:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '生成失败，请重试' },
      { status: 500 }
    );
  }
}
