import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HoaQuynhHeaderProps {
  onOpenSavedStories?: () => void;
  savedCount?: number;
}

const HoaQuynhHeaderBase: React.FC<HoaQuynhHeaderProps> = ({
  onOpenSavedStories,
  savedCount = 0,
}) => {
  return (
    <header className="relative w-full overflow-hidden pt-6 pb-8 px-4 sm:px-8 border-b border-purple-500/30 shadow-lg bg-gradient-to-b from-[#2a0945] via-[#1f0636] to-[#140326] text-purple-100">
      {/* Decorative ambient glowing purple background */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-purple-600/30 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -top-10 left-10 w-56 h-56 bg-fuchsia-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-violet-600/25 blur-3xl rounded-full pointer-events-none" />

      {/* Floating White Flower Petals & Stars Background with Gradual Bloom Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-85">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
          className="absolute top-3 left-[8%] animate-pulse duration-[4000ms]"
        >
          <span className="text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">🌸</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="absolute top-8 left-[20%] animate-bounce duration-[6000ms]"
        >
          <span className="text-lg text-pink-200 drop-shadow-[0_0_8px_rgba(255,192,203,0.8)]">🌸</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.45 }}
          className="absolute top-2 left-[38%] animate-bounce duration-[5500ms]"
        >
          <span className="text-xl text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">✨</span>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 25 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
          className="absolute top-4 right-[28%] animate-pulse duration-[5000ms]"
        >
          <span className="text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">🌸</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: "easeOut", delay: 0.75 }}
          className="absolute top-10 right-[15%] animate-pulse duration-[4500ms]"
        >
          <span className="text-lg text-pink-200 drop-shadow-[0_0_8px_rgba(255,192,203,0.8)]">🌸</span>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.9 }}
          className="absolute top-12 right-[6%] animate-bounce duration-[7000ms]"
        >
          <span className="text-lg text-amber-200">✨</span>
        </motion.div>
      </div>

      {/* Main Header Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center text-center gap-5"
      >
        
        {/* Center Header Title & Subtitle */}
        <div className="space-y-2.5 max-w-2xl mx-auto">
          {/* Tên thương hiệu chính, hiển thị nổi bật nhất */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-wide leading-tight text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.35)]"
          >
            Quỳnh Hoa <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">Story Studio</span>
          </motion.h1>

          {/* Dòng tiêu đề ngay bên dưới */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-[10px] sm:text-xs md:text-sm font-serif font-semibold text-purple-200 tracking-wide flex items-center justify-center gap-1.5 whitespace-nowrap overflow-x-auto px-2"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-300 shrink-0" />
            <span>Đêm Tím Mộng Mơ - Kẻ Dệt Mộng Trăng Non</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-300 shrink-0" />
          </motion.h2>
        </div>

      </motion.div>
    </header>
  );
};

export const HoaQuynhHeader = React.memo(HoaQuynhHeaderBase);
