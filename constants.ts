
import { Translation, AppLanguage } from './types';

export const TRANSLATIONS: Record<AppLanguage, Translation> = {
  'en': {
    title: 'TalkBoard',
    inputPlaceholder: 'Type something...',
    addShortcut: 'Save',
    clear: 'Clear',
    rotate: 'Rotate 90°',
    colors: 'Color Themes',
    shortcuts: 'Quick Phrases',
    language: 'Language',
    voicePrompt: 'Click to speak',
    voiceListening: 'Listening...',
    voiceError: 'Error recognizing voice',
    toolsLabel: 'Tools'
  },
  'ja': {
    title: 'トークボード',
    inputPlaceholder: '入力してください...',
    addShortcut: '保存',
    clear: 'クリア',
    rotate: '90度回転',
    colors: '配色テーマ',
    shortcuts: 'ショートカット',
    language: '言語',
    voicePrompt: '話しかけてください',
    voiceListening: '聞き取り中...',
    voiceError: '音声を認識できませんでした',
    toolsLabel: 'ツール'
  },
  'zh-CN': {
    title: '交流板',
    inputPlaceholder: '输入文字...',
    addShortcut: '保存',
    clear: '清除',
    rotate: '旋转 90°',
    colors: '配色主题',
    shortcuts: '常用短语',
    language: '语言',
    voicePrompt: '点击说话',
    voiceListening: '正在听...',
    voiceError: '语音识别错误',
    toolsLabel: '工具'
  },
  'zh-TW': {
    title: '交流板',
    inputPlaceholder: '輸入文字...',
    addShortcut: '儲存',
    clear: '清除',
    rotate: '旋轉90°',
    colors: '色彩主题',
    shortcuts: '常用短語',
    language: '語言',
    voicePrompt: '點擊說話',
    voiceListening: '正在聽...',
    voiceError: '語音識別錯誤',
    toolsLabel: '工具'
  }
};

export const LANGUAGE_LABELS: Record<AppLanguage, string> = {
  'en': 'English',
  'ja': '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文'
};

export const COLOR_PRESETS = [
  { bg: '#000000', text: '#ffffff', label: 'Black' },
  { bg: '#ffffff', text: '#000000', label: 'White' },
  { bg: '#1e3a8a', text: '#ffffff', label: 'Cobalt' },
  { bg: '#064e3b', text: '#ffffff', label: 'Castleton' },
  { bg: '#7f1d1d', text: '#ffffff', label: 'Red' },
  { bg: '#000000', text: '#ffff00', label: 'Yellow' },
  { bg: '#0000ff', text: '#ffffff', label: 'Blue' },
  { bg: '#000000', text: '#00ff00', label: 'Green' },
];

export const INITIAL_SHORTCUTS: Record<AppLanguage, string[]> = {
  'en': ['Hello!', 'Thank you', 'Where is the restroom?', 'I am hard of hearing', 'Please write it down'],
  'ja': ['こんにちは', 'ありがとうございます', 'お手洗いはどこですか？', '耳が不自由です', '書いてください'],
  'zh-CN': ['你好', '谢谢', '洗手间在哪里？', '我有听力障碍', '请写下来'],
  'zh-TW': ['你好', '謝謝', '洗手間在哪裡？', '我有聽力障礙', '請寫下來']
};
