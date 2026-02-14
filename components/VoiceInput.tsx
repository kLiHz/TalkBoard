
import React, { useState, useEffect, useCallback } from 'react';
import { AppLanguage, Translation } from '../types';

interface VoiceInputProps {
  onResult: (text: string) => void;
  language: AppLanguage;
  translations: Translation;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult, language, translations }) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);

  // Initialize Speech Recognition
  const getRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Map internal language codes to BCP 47
    const langMap: Record<AppLanguage, string> = {
      'en': 'en-US',
      'ja': 'ja-JP',
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW'
    };
    recognition.lang = langMap[language];

    return recognition;
  }, [language]);

  useEffect(() => {
    if (!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) {
      setSupported(false);
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = getRecognition();
    if (!recognition) return;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  if (!supported) return null;

  return (
    <button
      onClick={toggleListen}
      className={`relative flex items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${isListening ? 'bg-red-500 scale-110' : 'bg-blue-600 hover:bg-blue-500'}`}
      title={isListening ? translations.voiceListening : translations.voicePrompt}
    >
      <i className={`fas ${isListening ? 'fa-microphone-lines' : 'fa-microphone'} text-white text-2xl`}></i>
      {isListening && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
        </span>
      )}
    </button>
  );
};

export default VoiceInput;
