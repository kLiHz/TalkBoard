
import { Translation, AppLanguage } from './types';

export const TRANSLATIONS: Record<AppLanguage, Translation> = {
  'en': {
    title: 'TalkBoard',
    inputPlaceholder: 'Type message...',
    addShortcut: 'Save Phrase',
    clear: 'Clear',
    rotate: 'Rotate View',
    colors: 'Themes',
    shortcuts: 'Quick Phrases',
    language: 'Language',
    voicePrompt: 'Speak',
    voiceListening: 'Listening...',
    voiceError: 'Error',
    toolsLabel: 'Options'
  },
  'ja': {
    title: 'トークボード',
    inputPlaceholder: 'メッセージ入力...',
    addShortcut: '保存',
    clear: 'クリア',
    rotate: '画面回転',
    colors: 'テーマ',
    shortcuts: 'ショートカット',
    language: '言語',
    voicePrompt: '音声入力',
    voiceListening: '聞き取り中...',
    voiceError: 'エラー',
    toolsLabel: 'メニュー'
  },
  'zh-CN': {
    title: '交流板',
    inputPlaceholder: '输入消息...',
    addShortcut: '保存短语',
    clear: '清除',
    rotate: '旋转视图',
    colors: '主题',
    shortcuts: '常用短语',
    language: '语言',
    voicePrompt: '点击说话',
    voiceListening: '正在听...',
    voiceError: '错误',
    toolsLabel: '选项'
  },
  'zh-TW': {
    title: '交流板',
    inputPlaceholder: '輸入訊息...',
    addShortcut: '儲存短語',
    clear: '清除',
    rotate: '旋轉視圖',
    colors: '色彩主題',
    shortcuts: '常用短語',
    language: '語言',
    voicePrompt: '點擊說話',
    voiceListening: '正在聽...',
    voiceError: '錯誤',
    toolsLabel: '選項'
  }
};

export const LANGUAGE_LABELS: Record<AppLanguage, string> = {
  'en': 'English',
  'ja': '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文'
};

export const COLOR_PRESETS = [
  { bg: '#000000', text: '#ffffff', label: 'Inverted' },
  { bg: '#ffffff', text: '#000000', label: 'Modern' },
  { bg: '#000000', text: '#00ff00', label: 'Terminal' },
  { bg: '#000000', text: '#ffff00', label: 'High Vis' },
  { bg: '#1e1b4b', text: '#e0e7ff', label: 'Indigo' },
  { bg: '#450a0a', text: '#fecaca', label: 'Alert' },
  { bg: '#064e3b', text: '#d1fae5', label: 'Forest' },
];

export const INITIAL_SHORTCUTS: Record<AppLanguage, string[]> = {
  'en': ['Hello!', 'Thank you', 'Where is the restroom?', 'I am hard of hearing', 'Please write it down', 'How much is this?'],
  'ja': ['こんにちは', 'ありがとうございます', 'お手洗いはどこですか？', '耳が不自由です', '書いてください', 'おいくらですか？'],
  'zh-CN': ['你好', '谢谢', '洗手间在哪里？', '我有听力障碍', '请写下来', '这个多少钱？'],
  'zh-TW': ['你好', '謝謝', '洗手間在哪裡？', '我有聽力障礙', '請寫下來', '這個多少錢？']
};
