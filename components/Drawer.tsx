
import React, { useState, useEffect } from 'react';
import { AppLanguage, AppState, Translation } from '../types';
import { COLOR_PRESETS, LANGUAGE_LABELS } from '../constants';
import VoiceInput from './VoiceInput';

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  state: AppState;
  updateText: (text: string) => void;
  toggleRotation: () => void;
  setLanguage: (lang: AppLanguage) => void;
  setColors: (bg: string, text: string) => void;
  addShortcut: (text: string) => void;
  removeShortcut: (id: string) => void;
  translations: Translation;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  setIsOpen,
  state,
  updateText,
  toggleRotation,
  setLanguage,
  setColors,
  addShortcut,
  removeShortcut,
  translations
}) => {
  const [inputValue, setInputValue] = useState(state.currentText);

  // Sync internal input state with external text state (e.g. when shortcut is clicked)
  useEffect(() => {
    setInputValue(state.currentText);
  }, [state.currentText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateText(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    updateText('');
  };

  const currentShortcuts = state.shortcuts[state.language] || [];

  return (
    <div className={`fixed bottom-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'}`}>
      
      {/* Toggle Button */}
      <div className="flex justify-center -mb-px">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-800 text-white rounded-t-2xl px-8 py-2 shadow-lg border-t border-gray-700 flex items-center space-x-2"
        >
          <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
          <span className="text-xs uppercase tracking-widest font-bold">{translations.toolsLabel}</span>
        </button>
      </div>

      {/* Main Drawer Content */}
      <div className="bg-gray-900 border-t border-gray-800 p-4 pb-8 max-h-[80vh] overflow-y-auto shadow-2xl">
        
        {/* Text Input & Voice Recognition */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={translations.inputPlaceholder}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            {inputValue && (
              <button 
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <i className="fas fa-times-circle fa-lg"></i>
              </button>
            )}
          </div>
          
          <VoiceInput 
            onResult={(text) => {
              setInputValue(text);
              updateText(text);
            }} 
            language={state.language}
            translations={translations}
          />
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={toggleRotation}
            className={`flex-1 py-3 px-2 rounded-xl border flex items-center justify-center space-x-2 ${state.isRotated ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}`}
          >
            <i className="fas fa-rotate"></i>
            <span className="text-sm font-medium">{translations.rotate}</span>
          </button>
          
          <button 
            onClick={() => addShortcut(inputValue)}
            disabled={!inputValue.trim()}
            className="flex-1 py-3 px-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <i className="fas fa-bookmark"></i>
            <span className="text-sm font-medium">{translations.addShortcut}</span>
          </button>
        </div>

        {/* Section: Shortcuts */}
        <div className="mb-6">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">{translations.shortcuts}</h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {currentShortcuts.map((shortcut) => (
              <div key={shortcut.id} className="group relative">
                <button
                  onClick={() => updateText(shortcut.text)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 transition-colors"
                >
                  {shortcut.text}
                </button>
                <button 
                  onClick={() => removeShortcut(shortcut.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Config Rows */}
        <div className="grid grid-cols-2 gap-6">
          {/* Colors */}
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">{translations.colors}</h3>
            <div className="flex space-x-2">
              {COLOR_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setColors(p.bg, p.text)}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[8px] font-bold"
                  style={{ backgroundColor: p.bg, color: p.text, borderColor: state.bgColor === p.bg ? 'white' : 'transparent' }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">{translations.language}</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['en', 'ja', 'zh-CN', 'zh-TW'] as AppLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-1 px-2 rounded border text-[10px] font-medium ${state.language === lang ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                >
                  {LANGUAGE_LABELS[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Drawer;
