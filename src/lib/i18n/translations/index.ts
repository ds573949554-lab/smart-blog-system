// 翻译文件统一导出
import { zhCN } from './zh-CN';
import { zhTW } from './zh-TW';
import { yue } from './yue';
import { en } from './en';
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
  'zh-HK': zhTW, // 香港繁体暂用台湾繁体
  'yue': yue,
  'nan': nan,
  'en': en,
  'ja': zhCN, // 日语暂用简体中文
  'ko': zhCN, // 韩语暂用简体中文
  'es': en, // 西班牙语暂用英语
  'fr': en, // 法语暂用英语
  'de': en, // 德语暂用英语
  'pt': en, // 葡萄牙语暂用英语
  'ru': en, // 俄语暂用英语
  'ar': en, // 阿拉伯语暂用英语
  'hi': en, // 印地语暂用英语
};

// 获取翻译
export function getTranslation(locale: LocaleCode): Translation {
  return translations[locale] || translations['zh-CN'];
}
