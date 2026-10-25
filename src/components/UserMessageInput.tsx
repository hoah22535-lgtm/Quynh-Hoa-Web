import React, { useState, useEffect } from 'react';
import { MessageSquareText, Sparkles, Lightbulb, Trash2, ArrowRight, Heart, Send, MessageCircle } from 'lucide-react';
import { PROMPT_SUGGESTIONS } from '../data/presets';

interface UserMessageInputProps {
  userMessage: string;
  onChangeUserMessage: (msg: string) => void;
  onSubmitStory: () => void;
  isLoading?: boolean;
}

interface StudioComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  avatar: string;
}

const LOCAL_COMMENTS_KEY = 'quynh_hoa_studio_comments_v2';

export const UserMessageInput: React.FC<UserMessageInputProps> = ({
  userMessage,
  onChangeUserMessage,
  onSubmitStory,
  isLoading = false,
}) => {
  const [commentsList, setCommentsList] = useState<StudioComment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COMMENTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [authorName, setAuthorName] = useState('');
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(commentsList));
    } catch (e) {
      console.error(e);
    }
  }, [commentsList]);

  const handleSelectSuggestion = (promptText: string) => {
    onChangeUserMessage(promptText);
  };

  // Post comment to Quỳnh Hoa Studio Wall
  const handlePostStudioComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newComment: StudioComment = {
      id: Date.now().toString(),
      author: authorName.trim() || 'Bạn đọc giấu tên',
      text: userMessage.trim(),
      timestamp: 'Vừa xong',
      likes: 1,
      avatar: '🌺',
    };

    setCommentsList((prev) => [newComment, ...prev]);
  };

  const handleLikeComment = (id: string) => {
    const isLiked = likedCommentIds.includes(id);
    if (isLiked) {
      setCommentsList((prev) =>
        prev.map((c) => (c.id === id ? { ...c, likes: Math.max(0, c.likes - 1) } : c))
      );
      setLikedCommentIds((prev) => prev.filter((item) => item !== id));
    } else {
      setCommentsList((prev) =>
        prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
      );
      setLikedCommentIds((prev) => [...prev, id]);
    }
  };

  return (
    <div
      id="user-message-section"
      className="bg-[#240a3d]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-500/30 shadow-xl relative overflow-hidden transition-all text-purple-100"
    >
      {/* Decorative ambient flower glow */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <MessageSquareText className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                Hãy để lại một bình luận cho Quỳnh Hoa Studio
              </h2>
              <span className="text-[11px] text-pink-200 bg-pink-900/80 px-2.5 py-0.5 rounded-full border border-pink-400/40 font-medium">
                Quỳnh Hoa Studio
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5">
              Để lại bình luận yêu thương dành tặng Quỳnh Hoa Studio hoặc gửi gắm lời nhắn để bắt đầu câu chuyện!
            </p>
          </div>
        </div>

        {userMessage.length > 0 && (
          <button
            type="button"
            onClick={() => onChangeUserMessage('')}
            className="text-xs text-purple-300 hover:text-pink-300 flex items-center gap-1 transition-colors cursor-pointer"
            title="Xóa bình luận"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa</span>
          </button>
        )}
      </div>

      {/* Quick Suggestions for Comments */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-amber-200">Gợi ý bình luận:</span>
        {[
          'Quỳnh đáng yêu',
          'Quỳnh dễ thương',
          'Quỳnh xinh đẹp',
          'Quỳnh Hoa xịn xò quá nè!',
          'Chúc Quỳnh Hoa Studio luôn tươi vui!',
        ].map((sugg, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChangeUserMessage(sugg)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-900/70 hover:bg-purple-800 text-purple-200 border border-purple-400/30 transition-colors cursor-pointer"
          >
            "{sugg}"
          </button>
        ))}
      </div>

      {/* Optional Author Name */}
      <div className="mb-3">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Tên hoặc biệt danh của bạn (không bắt buộc)..."
          className="w-full px-3.5 py-2 bg-[#17052e] rounded-xl border border-purple-500/30 text-xs text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all"
        />
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          id="textarea-user-message"
          rows={3}
          value={userMessage}
          onChange={(e) => onChangeUserMessage(e.target.value)}
          placeholder="Hãy để lại một bình luận cho Quỳnh Hoa Studio... Ví dụ: Quỳnh đáng yêu, Quỳnh dễ thương quá nè!"
          className="w-full p-4 bg-[#17052e] rounded-xl border border-purple-500/40 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-inner resize-y min-h-[90px]"
        />

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-purple-300/80">
          <span>Bình luận của bạn sẽ được gửi trực tiếp lên Bảng Bình Luận Quỳnh Hoa Studio.</span>
          <span>{userMessage.length} ký tự</span>
        </div>
      </div>

      {/* Action Button: Post Comment to Wall */}
      <div className="mt-4 flex items-center">
        <button
          type="button"
          onClick={handlePostStudioComment}
          disabled={!userMessage.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 border border-pink-400/30"
        >
          <Send className="w-4 h-4 text-amber-200" />
          <span>Gửi bình luận đến Quỳnh Hoa Studio</span>
        </button>
      </div>

      {/* QUỲNH HOA STUDIO COMMENT WALL */}
      <div className="mt-6 pt-5 border-t border-purple-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-pink-300" />
            <h3 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Bảng Bình Luận Đã Gửi Tặng Quỳnh Hoa Studio ({commentsList.length})
            </h3>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
          {commentsList.map((comment) => {
            const isLiked = likedCommentIds.includes(comment.id);
            return (
              <div
                key={comment.id}
                onClick={() => onChangeUserMessage(comment.text)}
                className="p-3 rounded-xl bg-[#1d0636]/80 hover:bg-[#28094a] border border-purple-500/20 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                title="Nhấp để dùng bình luận này làm lời nhắn cốt truyện"
              >
                <div className="flex items-start gap-2.5 flex-1">
                  <div className="w-7 h-7 rounded-full bg-purple-800 text-sm flex items-center justify-center shrink-0 border border-purple-400/40">
                    {comment.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-200">
                        {comment.author}
                      </span>
                      <span className="text-[10px] text-purple-300/60">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-purple-100/90 mt-0.5 leading-relaxed">
                      "{comment.text}"
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeComment(comment.id);
                  }}
                  className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border transition-all cursor-pointer shrink-0 ${
                    isLiked
                      ? 'bg-pink-600 text-white border-pink-500'
                      : 'bg-purple-900/60 text-purple-200 border-purple-500/30 hover:bg-purple-800'
                  }`}
                >
                  <Heart
                    className={`w-3 h-3 ${
                      isLiked ? 'fill-white text-white' : 'text-pink-300'
                    }`}
                  />
                  <span>{comment.likes}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

