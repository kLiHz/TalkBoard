
import React, { useState, useEffect } from 'react';
import { AppLanguage, Shortcut, AppState } from './types';
import { TRANSLATIONS, INITIAL_SHORTCUTS } from './constants';
import Board from './components/Board';
import Drawer from './components/Drawer';

const App: React.FC = () => {
  // Load initial state from local storage or defaults
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('talkboard_state_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }

    // Generate initial shortcuts for all supported languages
    const languages: AppLanguage[] = ['en', 'ja', 'zh-CN', 'zh-TW'];
    const initialShortcuts: Record<AppLanguage, Shortcut[]> = {} as any;
    
    languages.forEach(lang => {
      initialShortcuts[lang] = INITIAL_SHORTCUTS[lang].map((text, i) => ({ 
        id: `init-${lang}-${i}`, 
        text 
      }));
    });

    return {
      currentText: 'Hello',
      bgColor: '#000000',
      textColor: '#ffffff',
      isRotated: false,
      language: 'en',
      shortcuts: initialShortcuts,
    };
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('talkboard_state_v2', JSON.stringify(state));
  }, [state]);

  const updateText = (text: string) => {
    setState(prev => ({ ...prev, currentText: text }));
  };

  const toggleRotation = () => {
    setState(prev => ({ ...prev, isRotated: !prev.isRotated }));
  };

  const setLanguage = (lang: AppLanguage) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const setColors = (bg: string, text: string, label: string) => {
    setState(prev => ({ ...prev, bgColor: bg, textColor: text, colorLabel: label }));
  };

  const addShortcut = (text: string) => {
    if (!text.trim()) return;
    const newShortcut: Shortcut = { id: Date.now().toString(), text };
    setState(prev => {
      const currentLangShortcuts = prev.shortcuts[prev.language] || [];
      return {
        ...prev,
        shortcuts: {
          ...prev.shortcuts,
          [prev.language]: [newShortcut, ...currentLangShortcuts]
        }
      };
    });
  };

  const removeShortcut = (id: string) => {
    setState(prev => {
      const currentLangShortcuts = prev.shortcuts[prev.language] || [];
      return {
        ...prev,
        shortcuts: {
          ...prev.shortcuts,
          [prev.language]: currentLangShortcuts.filter(s => s.id !== id)
        }
      };
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex flex-col">
      {/* Background/Display Area */}
      <Board 
        text={state.currentText}
        bgColor={state.bgColor}
        textColor={state.textColor}
        isRotated={state.isRotated}
      />

      {/* Tools Drawer Container */}
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        state={state}
        updateText={updateText}
        toggleRotation={toggleRotation}
        setLanguage={setLanguage}
        setColors={setColors}
        addShortcut={addShortcut}
        removeShortcut={removeShortcut}
        translations={TRANSLATIONS[state.language]}
      />
    </div>
  );
};

export default App;
