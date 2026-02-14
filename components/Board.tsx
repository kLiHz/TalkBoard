
import React, { useMemo } from 'react';

interface BoardProps {
  text: string;
  bgColor: string;
  textColor: string;
  isRotated: boolean;
}

const Board: React.FC<BoardProps> = ({ text, bgColor, textColor, isRotated }) => {
  // Logic to dynamically adjust font size based on text length
  const fontSizeClass = useMemo(() => {
    const len = text.length;
    if (len < 5) return isRotated ? 'text-[18vh] leading-none' : 'text-[18vw] leading-none';
    if (len < 12) return isRotated ? 'text-[14vh] leading-tight' : 'text-[14vw] leading-tight';
    if (len < 25) return isRotated ? 'text-[10vh] leading-tight' : 'text-[10vw] leading-tight';
    if (len < 60) return isRotated ? 'text-[8vh] leading-snug' : 'text-[8vw] leading-snug';
    return isRotated ? 'text-[6vh] leading-normal' : 'text-[5vw] leading-normal';
  }, [text, isRotated]);

  // Rotated container logic
  const containerClasses = isRotated 
    ? "fixed inset-0 flex items-center justify-center w-[100vh] h-[100vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 origin-center"
    : "fixed inset-0 flex items-center justify-center w-full h-full p-10";

  return (
    <div 
      className={`${containerClasses} transition-colors duration-500 overflow-hidden text-center font-black break-words whitespace-pre-wrap select-text`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        zIndex: 0
      }}
    >
      <div className={`${fontSizeClass} drop-shadow-sm`}>
        {text || " "}
      </div>
    </div>
  );
};

export default Board;
