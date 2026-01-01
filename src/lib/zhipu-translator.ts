// 智谱AI翻译服务
import type { LocaleCode } from './i18n/config';

interface TranslateOptions {
  text: string;
  targetLocale: LocaleCode;
  sourceLocale?: LocaleCode;
}

const LANGUAGE_NAMES: Record<LocaleCode, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  'zh-HK': '繁体中文（香港）',
  'yue': '粤语',
  'nan': '闽南语',
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'pt': 'Português',
  'ru': 'Русский',
  'ar': 'العربية',
  'hi': 'हिन्दी',
};

/**
 * 使用智谱AI进行文本翻译
 */
export async function translateText({ text, targetLocale, sourceLocale = 'zh-CN' }: TranslateOptions): Promise<string> {
  const apiKey = process.env.ZHIPU_API_KEY;

  if (!apiKey) {
    console.warn('ZHIPU_API_KEY not configured, returning original text');
    return text;
  }

  const targetLanguage = LANGUAGE_NAMES[targetLocale] || targetLocale;
  const sourceLanguage = LANGUAGE_NAMES[sourceLocale] || sourceLocale;

  try {
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
            content: `你是一个专业的翻译助手。请将文本从${sourceLanguage}翻译成${targetLanguage}。只返回翻译后的文本，不要添加任何解释或额外内容。保持原文的语气、风格和格式。`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    const data = await response.json();
    const translatedText = data.choices[0]?.message?.content;

    if (!translatedText) {
      throw new Error('No translation returned from API');
    }

    return translatedText.trim();
  } catch (error) {
    console.error('Translation error:', error);
    // 如果翻译失败，返回原文
    return text;
  }
}

/**
 * 批量翻译多个文本
 */
export async function translateBatch(texts: string[], targetLocale: LocaleCode, sourceLocale?: LocaleCode): Promise<string[]> {
  const promises = texts.map(text => translateText({ text, targetLocale, sourceLocale }));
  return Promise.all(promises);
}

/**
 * 检测文本语言（使用智谱AI）
 */
export async function detectLanguage(text: string): Promise<LocaleCode> {
  // 简单的语言检测逻辑
  // 如果包含中文字符，返回简体中文
  if (/[\u4e00-\u9fa5]/.test(text)) {
    return 'zh-CN';
  }
  // 如果包含日文假名，返回日语
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
    return 'ja';
  }
  // 如果包含韩文，返回韩语
  if (/[\uac00-\ud7af]/.test(text)) {
    return 'ko';
  }
  // 默认返回英语
  return 'en';
}
