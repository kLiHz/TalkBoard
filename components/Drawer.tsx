
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
    <div 
      className={`fixed bottom-0 left-0 w-full transition-all duration-500 ease-out z-50 transform 
        ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-64px)]'}`}
    >
      {/* Handle / Toggle Button Area */}
      <div className="flex justify-center -mb-px relative z-10">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-zinc-900/90 backdrop-blur-md text-white rounded-t-3xl px-10 py-3 shadow-2xl border-t border-x border-white/10 flex flex-col items-center group active:scale-95 transition-transform"
        >
          <div className="w-10 h-1 bg-white/20 rounded-full mb-2 group-hover:bg-white/40 transition-colors" />
          <span className="text-[10px] uppercase font-black tracking-widest text-white/60">{translations.toolsLabel}</span>
        </button>
      </div>

      {/* Tools Body */}
      <div className="bg-zinc-900/95 backdrop-blur-xl border-t border-white/10 p-6 pb-10 max-h-[85vh] overflow-y-auto shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)]">
        
        {/* Main Control Bar (Input + Voice) */}
        <div className="flex items-start gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={translations.inputPlaceholder}
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 text-xl placeholder:text-white/20 transition-all"
            />
            {inputValue && (
              <button 
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white active:scale-90 transition-all p-2"
              >
                <i className="fas fa-times-circle text-xl"></i>
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

        {/* Rotation and Save Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button 
            onClick={toggleRotation}
            className={`py-4 px-4 rounded-2xl border transition-all flex items-center justify-center gap-3 active:scale-95
              ${state.isRotated 
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}`}
          >
            <i className="fas fa-arrows-rotate text-lg"></i>
            <span className="font-bold text-sm tracking-wide">{translations.rotate}</span>
          </button>
          
          <button 
            onClick={() => addShortcut(inputValue)}
            disabled={!inputValue.trim()}
            className="py-4 px-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 transition-all flex items-center justify-center gap-3 active:scale-95 hover:bg-white/10 disabled:opacity-20 disabled:active:scale-100"
          >
            <i className="fas fa-plus-circle text-lg"></i>
            <span className="font-bold text-sm tracking-wide">{translations.addShortcut}</span>
          </button>
        </div>

        {/* Shortcuts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{translations.shortcuts}</h3>
            <span className="h-px flex-grow ml-4 bg-white/5"></span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentShortcuts.length > 0 ? currentShortcuts.map((shortcut) => (
              <div key={shortcut.id} className="relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button
                  onClick={() => updateText(shortcut.text)}
                  className="bg-white/5 hover:bg-white/10 active:scale-95 text-white/90 px-4 py-3 rounded-xl text-sm border border-white/5 transition-all"
                >
                  {shortcut.text}
                </button>
                <button 
                  onClick={() => removeShortcut(shortcut.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border-2 border-zinc-900"
                >
                  <i className="fas fa-times text-[10px]"></i>
                </button>
              </div>
            )) : (
              <p className="text-white/20 text-xs italic px-1">No phrases saved yet.</p>
            )}
          </div>
        </div>

        {/* Secondary Config Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
          {/* Themes */}
          <div>
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">{translations.colors}</h3>
            <div className="flex flex-wrap gap-3">
              {COLOR_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setColors(p.bg, p.text)}
                  title={p.label}
                  className={`w-12 h-12 rounded-full border-2 transition-all active:scale-90 shadow-lg flex items-center justify-center
                    ${state.bgColor === p.bg ? 'border-indigo-500 scale-110' : 'border-white/10'}`}
                  style={{ backgroundColor: p.bg, color: p.text }}
                >
                  <span className="text-[8px] font-black tracking-tighter uppercase opacity-30">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">{translations.language}</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['en', 'ja', 'zh-CN', 'zh-TW'] as AppLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all active:scale-95
                    ${state.language === lang 
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' 
                      : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'}`}
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
