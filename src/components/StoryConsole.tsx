import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Volume2, VolumeX, Copy, Check, Bookmark, Download, RotateCcw, User, Flower2, ChevronRight } from 'lucide-react';
import { StorySession } from '../types';

interface StoryConsoleProps {
  session: StorySession;
  onSendMessage: (text: string) => void;
  onSaveStory: (session: StorySession) => void;
  onReset: () => void;
  isGeneratingMessage: boolean;
  isSaved?: boolean;
}

const StoryConsoleBase: React.FC<StoryConsoleProps> = ({
  session,
  onSendMessage,
  onSaveStory,
  onReset,
  isGeneratingMessage,
  isSaved = false,
}) => {
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, isGeneratingMessage]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isGeneratingMessage) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleChoiceClick = (choice: string) => {
    if (!isGeneratingMessage) {
      onSendMessage(choice);
    }
  };

  const handleCopyStory = () => {
    const formattedText = `=== ${session.title} ===\nThể loại: ${session.genre}\nNhân vật: ${session.character.name} (${session.character.link})\n\n` +
      session.messages.map(m => `[${m.sender === 'user' ? 'User' : m.sender === 'character' ? session.character.name : 'Dẫn chuyện'}]: ${m.content}`).join('\n\n');
    
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadStory = () => {
    const formattedText = `=== ${session.title} ===\nThể loại: ${session.genre}\nNhân vật: ${session.character.name} (${session.character.link})\n\n` +
      session.messages.map(m => `[${m.sender === 'user' ? 'User' : m.sender === 'character' ? session.character.name : 'Dẫn chuyện'}]: ${m.content}`).join('\n\n');
    
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CotTruyen_${session.character.name.replace(/\s+/g, '_')}_QuynhHoaStudio.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Get last character message for fast choices
  const lastCharacterMessage = [...session.messages].reverse().find(m => m.sender === 'character');

  return (
    <div id="story-console-container" className="bg-[#240a3d]/90 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden flex flex-col min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-300 text-purple-100">
      
      {/* Console Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2d0b52] via-[#21073b] to-[#160329] border-b border-purple-500/30 flex flex-wrap items-center justify-between gap-3">
        
        {/* Character Cherry Blossom Badge & Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[url('https://images.unsplash.com/photo-1522383225653-ed111181a951?w=200&auto=format&fit=crop&q=80')] bg-cover bg-center border-2 border-pink-400/50 shadow-md shrink-0 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-pink-900/30" />
            <Flower2 className="w-5 h-5 text-pink-200 relative z-10 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-serif font-bold text-white">
                {session.title || `Cốt Truyện với ${session.character.name}`}
              </h2>
            </div>
            <p className="text-xs text-pink-300 font-semibold mt-0.5 flex items-center gap-1">
              <Flower2 className="w-3.5 h-3.5" />
              <span>Đang tương tác dưới vòm Hoa Anh Đào cùng {session.character.name}</span>
            </p>
          </div>
        </div>

        {/* Console Action Bar */}
        <div className="flex items-center gap-2">
          <button
            id="btn-save-current-mode-console"
            type="button"
            onClick={() => {
              onSaveStory(session);
              const savedMode = {
                character: session.character,
                selectedGenre: session.genre,
                activeSession: session,
                savedAt: new Date().toLocaleString('vi-VN'),
              };
              localStorage.setItem('quynh_hoa_current_game_mode', JSON.stringify(savedMode));
              alert(`🎉 ĐÃ LƯU CHẾ ĐỘ CHƠI HIỆN TẠI THÀNH CÔNG!\n\n- Nhân vật: ${session.character.name}\n- Thể loại: ${session.genre}\n- Tiền trình: ${session.messages.length} câu hội thoại\n\nLưu trữ thành công vào hệ thống Quỳnh Hoa Studio!`);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            title="Lưu chế độ chơi hiện tại & toàn bộ tiến trình"
          >
            <span>💾 Lưu chế độ chơi hiện tại</span>
          </button>

          <button
            id="btn-save-story"
            type="button"
            onClick={() => onSaveStory(session)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSaved
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-purple-900 hover:bg-purple-800 text-purple-100 border border-purple-400/30'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-pink-300" />
            <span>{isSaved ? 'Đã lưu' : 'Lưu truyện'}</span>
          </button>

          <button
            id="btn-copy-story"
            type="button"
            onClick={handleCopyStory}
            className="p-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 text-xs transition-colors cursor-pointer"
            title="Sao chép toàn bộ cốt truyện"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            id="btn-download-story"
            type="button"
            onClick={handleDownloadStory}
            className="p-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-400/30 text-xs transition-colors cursor-pointer"
            title="Tải văn bản .txt"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            id="btn-reset-story"
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border border-purple-500/30"
            title="Tạo cốt truyện mới"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tạo mới</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-[#1c0633] to-[#120324] max-h-[500px] custom-scrollbar">
        {session.messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isNarrator = msg.sender === 'narrator';

          if (isNarrator) {
            return (
              <div key={msg.id} className="my-4 px-4 py-3 rounded-2xl bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs italic sm:text-sm leading-relaxed max-w-3xl mx-auto shadow-sm">
                <div className="flex items-center gap-1.5 font-semibold text-amber-300 not-italic mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dẫn cảnh & Bối cảnh Quỳnh Hoa Studio:</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar Icon */}
              <div className="shrink-0 mt-1">
                {isUser ? (
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-purple-400/40">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[url('https://images.unsplash.com/photo-1522383225653-ed111181a951?w=100&auto=format&fit=crop&q=80')] bg-cover bg-center border border-pink-400/50 shadow-md flex items-center justify-center">
                    <Flower2 className="w-4 h-4 text-pink-200" />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div className={`space-y-1 ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="flex items-center gap-2 text-[11px] text-purple-300/80 font-medium px-1">
                  <span>{isUser ? 'Bạn' : session.character.name}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => toggleSpeech(msg.content)}
                      className="text-pink-300 hover:text-white ml-1 transition-colors cursor-pointer"
                      title="Đọc bằng giọng nói"
                    >
                      {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none'
                      : 'bg-[#280a47] text-purple-100 border border-purple-400/30 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator when Character is responding */}
        {isGeneratingMessage && (
          <div className="flex gap-3 max-w-xl mr-auto items-center animate-pulse">
            <img
              src={session.character.avatar}
              alt={session.character.name}
              className="w-8 h-8 rounded-full object-cover border border-purple-400/50"
            />
            <div className="px-4 py-3 bg-[#280a47] border border-purple-500/30 rounded-2xl rounded-tl-none text-xs text-purple-200 font-medium flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-amber-300 animate-bounce delay-200" />
              <span>{session.character.name} đang chắp lời đáp dưới vòm hoa quỳnh...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Fast Action Choices / Options */}
      {lastCharacterMessage && lastCharacterMessage.actionChoices && lastCharacterMessage.actionChoices.length > 0 && !isGeneratingMessage && (
        <div className="px-4 py-2.5 bg-[#170429] border-t border-purple-500/30 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-amber-200 shrink-0">Lựa chọn phản hồi nhanh:</span>
          {lastCharacterMessage.actionChoices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChoiceClick(choice)}
              className="text-xs px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 hover:text-white border border-purple-400/30 font-medium transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>{choice}</span>
              <ChevronRight className="w-3 h-3 text-pink-300" />
            </button>
          ))}
        </div>
      )}

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-[#1e0736] border-t border-purple-500/30">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            id="input-reply-message"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGeneratingMessage}
            placeholder={`Trả lời ${session.character.name} hoặc điều hướng tiếp cốt truyện...`}
            className="flex-1 px-4 py-3 bg-[#130324] focus:bg-[#1a0530] rounded-xl border border-purple-500/40 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300 transition-all"
          />

          <button
            id="btn-send-reply"
            type="submit"
            disabled={!inputText.trim() || isGeneratingMessage}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span>Gửi</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

export const StoryConsole = React.memo(StoryConsoleBase);

