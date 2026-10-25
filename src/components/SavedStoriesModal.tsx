import React from 'react';
import { Bookmark, Trash2, ArrowRight, X, Clock, BookOpen } from 'lucide-react';
import { StorySession } from '../types';

interface SavedStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSessions: StorySession[];
  onLoadSession: (session: StorySession) => void;
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
}

export const SavedStoriesModal: React.FC<SavedStoriesModalProps> = ({
  isOpen,
  onClose,
  savedSessions,
  onLoadSession,
  onDeleteSession,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#240a3d] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-purple-500/40 flex flex-col text-purple-100">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2e0b52] via-[#21073b] to-[#160329] border-b border-purple-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-900 text-amber-200 flex items-center justify-center border border-purple-400/30">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Kho Cốt Truyện Đã Lưu ({savedSessions.length})
              </h3>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Xem lại và tiếp tục các chương truyện nhập vai Quỳnh Hoa Studio
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-purple-900 hover:bg-purple-800 text-purple-200 hover:text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer border border-purple-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
          {savedSessions.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto opacity-80" />
              <h4 className="text-sm font-semibold text-white">Chưa có cốt truyện nào được lưu</h4>
              <p className="text-xs text-purple-300 max-w-sm mx-auto">
                Khi bạn khởi tạo cốt truyện và bấm "Lưu truyện", các tác phẩm sẽ xuất hiện tại đây để bạn xem lại bất cứ lúc nào.
              </p>
            </div>
          ) : (
            savedSessions.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-xl border border-purple-500/30 bg-[#1c0633] hover:bg-[#270a47] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.character.avatar}
                    alt={s.character.name}
                    className="w-12 h-12 rounded-xl object-cover border border-purple-400/40 shrink-0 bg-purple-950"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {s.title || `Truyện với ${s.character.name}`}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-amber-200 font-medium border border-purple-500/30">
                        {s.genre}
                      </span>
                    </div>
                    <p className="text-xs text-purple-200/80 line-clamp-1">
                      Nhân vật: <span className="font-semibold text-pink-300">{s.character.name}</span> • Lời nhắn: "{s.userPrompt}"
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-purple-300/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {s.updatedAt}
                      </span>
                      <span>{s.messages.length} lượt thoại</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onLoadSession(s);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-md"
                  >
                    <span>Mở đọc</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteSession(s.id)}
                    className="p-1.5 rounded-lg text-purple-300 hover:text-pink-300 hover:bg-purple-900 transition-colors cursor-pointer"
                    title="Xóa truyện này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        {savedSessions.length > 0 && (
          <div className="p-3 bg-[#150326] border-t border-purple-500/30 flex items-center justify-between text-xs text-purple-300">
            <span>Dữ liệu lưu trữ trực tiếp trên trình duyệt của bạn</span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-pink-300 hover:text-white font-semibold cursor-pointer"
            >
              Xóa tất cả
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

