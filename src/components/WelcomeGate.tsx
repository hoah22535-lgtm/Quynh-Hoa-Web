import React, { useState, useEffect } from 'react';
import { Flower2 } from 'lucide-react';

interface WelcomeGateProps {
  onEnter: () => void;
}

export const WelcomeGate: React.FC<WelcomeGateProps> = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(onEnter, 500); // Wait for transition
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#1c0630] via-[#2d0a4d] to-[#1c0630] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]" />

      {/* Mascot Animation Container */}
      <div className="relative mb-8 animate-bounce">
        <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white/20 relative overflow-hidden group hover:scale-110 transition-transform cursor-pointer"
             onClick={(e) => { e.currentTarget.classList.add('animate-spin'); setTimeout(() => e.currentTarget.classList.remove('animate-spin'), 1000); }}>
          <Flower2 className="w-20 h-20 text-purple-600" />
          {/* Eyes */}
          <div className="absolute top-10 left-6 w-3 h-3 bg-purple-900 rounded-full animate-pulse" />
          <div className="absolute top-10 right-6 w-3 h-3 bg-purple-900 rounded-full animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center drop-shadow-md">
        Chào mừng các bạn đến với Quỳnh Hoa Story Studio
      </h1>
      <p className="text-purple-200 text-lg mb-8 italic drop-shadow-sm">
        Đêm Tím Mộng Mơ - Kẻ Dệt Mộng Trăng Non
      </p>

      <button
        onClick={handleEnter}
        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full text-lg font-bold border border-white/30 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
      >
        Bước vào mộng cảnh
      </button>
    </div>
  );
};
