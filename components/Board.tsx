
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
    if (len < 5) return isRotated ? 'text-[15vh] leading-tight' : 'text-[15vw] leading-tight';
    if (len < 10) return isRotated ? 'text-[12vh] leading-tight' : 'text-[12vw] leading-tight';
    if (len < 20) return isRotated ? 'text-[9vh] leading-tight' : 'text-[9vw] leading-tight';
    if (len < 50) return isRotated ? 'text-[7vh] leading-snug' : 'text-[7vw] leading-snug';
    return isRotated ? 'text-[5vh] leading-normal' : 'text-[5vw] leading-normal';
  }, [text, isRotated]);

  const rotatedStyles: React.CSSProperties = isRotated ? {
    width: '100vh',
    height: '100vw',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    transformOrigin: 'center center',
  } : {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  return (
    <div 
      className="flex items-center justify-center p-8 transition-colors duration-300 overflow-hidden text-center font-bold break-words whitespace-pre-wrap"
      style={{
        ...rotatedStyles,
        backgroundColor: bgColor,
        color: textColor,
        zIndex: 0
      }}
    >
      <div className={fontSizeClass}>
        {text || " "}
      </div>
    </div>
  );
};

export default Board;
