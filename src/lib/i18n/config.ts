// 支持的语言配置
export const locales = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-HK', name: '繁體中文（香港）', flag: '🇭🇰' },
  { code: 'yue', name: '粵語', flag: '🇭🇰' },
  { code: 'nan', name: '閩南語', flag: '🇹🇼' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
] as const;

export type LocaleCode = typeof locales[number]['code'];

export const defaultLocale: LocaleCode = 'zh-CN';

// 语言名称映射
export const localeNames: Record<LocaleCode, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'zh-HK': '繁體中文（香港）',
  'yue': '粵語',
  'nan': '閩南語',
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
