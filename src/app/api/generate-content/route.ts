import { NextRequest, NextResponse } from 'next/server';

// 语言映射配置
const languagePrompts = {
  'zh-CN': {
    systemPrompt: '你是一个专业的文章写作助手。请根据用户提供的标题，生成一篇结构完整、内容丰富的 Markdown 格式文章。文章应包含：标题、简介、多个小节（使用 ## 二级标题）、要点列表、总结等。字数控制在 500-800 字左右。',
    userPromptPrefix: '请为以下标题生成一篇高质量的 Markdown 文章：\n\n标题：',
  },
  'zh-TW': {
    systemPrompt: '你是一個專業的文章寫作助手。請根據用戶提供的標題，生成一篇結構完整、內容豐富的 Markdown 格式文章。文章應包含：標題、簡介、多個小節（使用 ## 二級標題）、要點列表、總結等。字數控制在 500-800 字左右。',
    userPromptPrefix: '請為以下標題生成一篇高質量的 Markdown 文章：\n\n標題：',
  },
  'yue': {
    systemPrompt: '你係一個專業嘅文章寫作助手。請根據用户提供嘅標題，生成一篇結構完整、內容豐富嘅 Markdown 格式文章。文章應包含：標題、簡介、多個小節（使用 ## 二級標題）、要點列表、總結等。字數控制喺 500-800 字左右。',
    userPromptPrefix: '請為以下標題生成一篇高質量嘅 Markdown 文章：\n\n標題：',
  },
  'en': {
    systemPrompt: 'You are a professional article writing assistant. Please generate a well-structured, content-rich Markdown format article based on the title provided by the user. The article should include: title, introduction, multiple sections (using ## level 2 headings), bullet points, conclusion, etc. Keep the word count around 500-800 words.',
    userPromptPrefix: 'Please generate a high-quality Markdown article for the following title:\n\nTitle: ',
  },
  'es': {
    systemPrompt: 'Eres un asistente de escritura profesional. Por favor, genera un artículo bien estructurado y rico en contenido en formato Markdown basado en el título proporcionado por el usuario. El artículo debe incluir: título, introducción, múltiples secciones (usando ## encabezados de nivel 2), viñetas, conclusión, etc. Mantén el recuento de palabras alrededor de 500-800 palabras.',
    userPromptPrefix: 'Por favor, genera un artículo de alta calidad en formato Markdown para el siguiente título:\n\nTítulo: ',
  },
  'fr': {
    systemPrompt: 'Vous êtes un assistant de rédaction professionnel. Veuillez générer un article bien structuré et riche en contenu au format Markdown basé sur le titre fourni par l\'utilisateur. L\'article doit inclure : titre, introduction, plusieurs sections (utilisant ## titres de niveau 2), puces, conclusion, etc. Gardez le nombre de mots autour de 500-800 mots.',
    userPromptPrefix: 'Veuillez générer un article de haute qualité au format Markdown pour le titre suivant :\n\nTitre : ',
  },
  'ja': {
    systemPrompt: 'あなたはプロのライティングアシスタントです。ユーザーが提供したタイトルに基づいて、構造が整い、内容が豊富なMarkdown形式の記事を生成してください。記事には以下を含める必要があります：タイトル、紹介、複数のセクション（## レベル2見出しを使用）、箇条書き、結論など。文字数は500〜800文字程度にしてください。',
    userPromptPrefix: '以下のタイトルで高品質なMarkdown記事を生成してください：\n\nタイトル：',
  },
  'ko': {
    systemPrompt: '당신은 전문 글쓰기 도우미입니다. 사용자가 제공한 제목을 바탕으로 구조가 완전하고 내용이 풍부한 Markdown 형식의 아티클을 생성해 주세요. 아티클에는 다음이 포함되어야 합니다: 제목, 소개, 여러 섹션(## 레벨 2 제목 사용), 글머리 기호, 결론 등. 단어 수는 500-800단어 정도로 유지하세요.',
    userPromptPrefix: '다음 제목에 대해 고품질 Markdown 아티클을 생성해 주세요:\n\n제목: ',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { title, locale = 'zh-CN' } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: locale === 'zh-CN' ? '标题不能为空' : 'Title is required' },
        { status: 400 }
      );
    }

    // 检查环境变量
    const apiKey = process.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: locale === 'zh-CN' ? '未配置 ZHIPU_API_KEY，请在 Vercel 环境变量中添加' : 'ZHIPU_API_KEY not configured' },
        { status: 500 }
      );
    }

    // 获取当前语言的提示词配置
    const promptConfig = languagePrompts[locale as keyof typeof languagePrompts] || languagePrompts['zh-CN'];

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
            content: promptConfig.systemPrompt,
          },
          {
            role: 'user',
            content: `${promptConfig.userPromptPrefix}${title}`
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
        { error: locale === 'zh-CN' ? `智谱 AI API 调用失败: ${errorData.error?.message || '未知错误'}` : `Zhipu AI API Error: ${errorData.error?.message || 'Unknown error'}` },
        { response.status }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content || '';

    if (!generatedContent) {
      return NextResponse.json(
        { error: locale === 'zh-CN' ? 'AI 生成的内容为空' : 'AI generated content is empty' },
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
