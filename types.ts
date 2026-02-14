
export type AppLanguage = 'en' | 'ja' | 'zh-CN' | 'zh-TW';

export interface Shortcut {
  id: string;
  text: string;
}

export interface AppState {
  currentText: string;
  bgColor: string;
  textColor: string;
  isRotated: boolean;
  language: AppLanguage;
  shortcuts: Record<AppLanguage, Shortcut[]>;
}

export interface Translation {
  title: string;
  inputPlaceholder: string;
  addShortcut: string;
  clear: string;
  rotate: string;
  colors: string;
  shortcuts: string;
  language: string;
  voicePrompt: string;
  voiceListening: string;
  voiceError: string;
  toolsLabel: string;
}
