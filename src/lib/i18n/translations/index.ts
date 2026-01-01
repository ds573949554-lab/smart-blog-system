// 翻译文件统一导出
import { zhCN } from './zh-CN';
import { zhTW } from './zh-TW';
import { yue } from './yue';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import { es } from './es';
import { fr } from './fr';
import type { LocaleCode } from '../config';
import type { Translation } from './zh-CN';

// 简化版闽南语（基于繁体中文）
const nan: Translation = {
  ...zhTW,
  nav: {
    ...zhTW.nav,
    home: '頭頁',
    about: '關係阮',
    contact: '聯絡阮',
    consultation: '隨諮詢',
  },
};

// 翻译映射表
export const translations: Record<LocaleCode, Translation> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'zh-HK': zhTW,
  'yue': yue,
  'nan': nan,
  'en': en,
  'ja': ja,
  'ko': ko,
  'es': es,
  'fr': fr,
  'de': fr, // 德语使用法语作为临时方案
  'pt': es, // 葡萄牙语使用西班牙语作为临时方案
  'ru': en, // 俄语使用英语作为临时方案
  'ar': en, // 阿拉伯语使用英语作为临时方案
  'hi': en, // 印地语使用英语作为临时方案
};

// 获取翻译
export function getTranslation(locale: LocaleCode): Translation {
  return translations[locale] || translations['zh-CN'];
}
