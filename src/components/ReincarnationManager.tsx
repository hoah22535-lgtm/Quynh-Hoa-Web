import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, BookOpen, Home, RefreshCw, FileText, Sparkles } from 'lucide-react';
import { ReincarnationCommand } from '../types';
import { reincarnationCommands } from '../data/reincarnationCommands';

interface ReincarnationManagerProps {
  onBackToHome?: () => void;
}

/**
 * Loại bỏ các dấu ngoặc vuông giữ chỗ [...] ở đầu và cuối nếu có,
 * giữ nguyên định dạng và các ký tự đặc biệt bên trong nội dung.
 */
function cleanPlaceholder(text?: string): string {
  if (!text) return '';
  let trimmed = text.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    trimmed = trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

/**
 * Kiểm tra xem `content` có phải là placeholder giữ chỗ hay không.
 * Nếu content là placeholder (chứa `[...]`, `...`, hoặc các từ khóa giữ chỗ mẫu chưa điền)
 * thì sẽ được xác định là placeholder để ẩn đi hoặc hiển thị thông báo thay thế.
 */
function isPlaceholderContent(content?: string): boolean {
  if (!content) return true;
  const trimmed = content.trim();

  // Kiểm tra rỗng hoặc chỉ có dấu chấm / ngoặc rỗng
  if (trimmed === '' || trimmed === '...' || trimmed === '[]') {
    return true;
  }

  // Kiểm tra nếu nội dung chứa ký hiệu giữ chỗ '[...]'
  if (trimmed.includes('[...]')) {
    return true;
  }

  // Kiểm tra các mẫu chữ placeholder phổ biến
  const lower = trimmed.toLowerCase();
  const placeholderPhrases = [
    'nội dung',
    'nhập nội dung',
    'nhập nội dung vào đây',
    'dán lệnh vào đây',
    'điền nội dung',
    'chưa có nội dung',
    'đang cập nhật',
    'placeholder',
    'chưa cập nhật',
  ];

  if (placeholderPhrases.includes(lower)) {
    return true;
  }

  // Nếu chuỗi nằm trong ngoặc vuông ngắn ngủi [xxx] và dưới 40 ký tự, không có ngắt dòng
  if (trimmed.startsWith('[') && trimmed.endsWith(']') && trimmed.length < 40 && !trimmed.includes('\n')) {
    const inner = trimmed.slice(1, -1).trim().toLowerCase();
    if (placeholderPhrases.some(p => inner.includes(p))) {
      return true;
    }
  }

  // Nội dung thực tế hợp lệ
  return false;
}

const ReincarnationManagerBase: React.FC<ReincarnationManagerProps> = ({ onBackToHome }) => {
  const [selected, setSelected] = useState<ReincarnationCommand | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lọc danh sách các lệnh thực tế có nội dung (không phải placeholder)
  const validCommands = React.useMemo(() => {
    return reincarnationCommands.filter(
      (cmd) => cmd && cmd.content && !isPlaceholderContent(cmd.content)
    );
  }, []);

  const handleCopy = (rawContent: string, id: string) => {
    const textToCopy = cleanPlaceholder(rawContent);
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // =========================================================================
  // GIAO DIỆN CHI TIẾT KHI XEM LỆNH
  // =========================================================================
  if (selected) {
    const isPlaceholder = isPlaceholderContent(selected.content);
    const cleanTitle = cleanPlaceholder(selected.title);
    const cleanDesc = cleanPlaceholder(selected.description);
    const cleanContent = cleanPlaceholder(selected.content);
    const isCopied = copiedId === selected.id;

    return (
      <div className="space-y-6 text-purple-100 animate-in fade-in duration-300">
        {/* Thanh điều hướng */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 text-purple-200 hover:text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-pink-300" />
            <span>Quay lại danh sách lệnh</span>
          </button>

          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:text-pink-200 text-xs sm:text-sm transition cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-300" />
              <span>Trở về trang chủ</span>
            </button>
          )}
        </div>

        {/* Khung nội dung lệnh chi tiết */}
        <div className="bg-gradient-to-br from-[#24063f]/95 via-[#19042c]/95 to-[#120224]/95 p-5 sm:p-7 rounded-2xl border border-purple-500/40 shadow-xl space-y-5">
          {/* Header lệnh */}
          <div className="space-y-2 border-b border-purple-500/20 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-purple-800/60 border border-purple-400/30 text-pink-300">
                  <RefreshCw className="w-5 h-5 text-emerald-300" />
                </span>
                <h3 className="text-lg sm:text-2xl font-bold font-serif text-amber-200">
                  {cleanTitle}
                </h3>
              </div>

              {/* Nút sao chép (chỉ hiển thị khi có nội dung thực tế) */}
              {!isPlaceholder && (
                <button
                  type="button"
                  onClick={() => handleCopy(selected.content, selected.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-lg cursor-pointer ${
                    isCopied
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-300/50 ring-2 ring-emerald-400/30'
                      : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white hover:opacity-95 border border-pink-300/40'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>✓ Đã sao chép toàn bộ lệnh!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Sao chép toàn bộ lệnh</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {cleanDesc && (
              <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed bg-purple-950/60 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                <span className="text-amber-300 font-semibold mr-1.5">📌 Ghi chú:</span>
                {cleanDesc}
              </p>
            )}
          </div>

          {/* Vùng hiển thị nội dung lệnh */}
          {isPlaceholder ? (
            /* Thông báo thay thế nếu nội dung là placeholder */
            <div className="p-8 text-center bg-purple-950/50 rounded-xl border border-dashed border-purple-500/40 space-y-2">
              <p className="text-amber-200 font-bold text-sm sm:text-base">
                Lệnh chuyển sinh đang được cập nhật.
              </p>
              <p className="text-xs text-purple-300">
                Chủ website chưa điền nội dung hoàn chỉnh cho mục này.
              </p>
            </div>
          ) : (
            /* Nội dung thực tế giữ nguyên định dạng ngắt dòng & ký tự */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-purple-300 px-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-pink-300" />
                  Nội dung lệnh chi tiết ({cleanContent.length.toLocaleString('vi-VN')} ký tự)
                </span>
                <span className="text-purple-400 text-[11px]">
                  Giữ nguyên định dạng & ngắt dòng
                </span>
              </div>

              <div className="relative group">
                <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-purple-100 p-4 sm:p-6 bg-[#0c0117] rounded-xl border border-purple-500/40 max-h-[65vh] overflow-y-auto leading-relaxed selection:bg-pink-600 selection:text-white shadow-inner">
                  {cleanContent}
                </pre>

                <button
                  type="button"
                  onClick={() => handleCopy(selected.content, selected.id)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-medium border border-purple-400/40 backdrop-blur-md transition cursor-pointer flex items-center gap-1.5 shadow"
                  title="Sao chép nội dung"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-emerald-300 font-bold">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-pink-300" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Nút hành động phía dưới */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-500/20">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-pink-300" />
              <span>Quay lại danh sách lệnh</span>
            </button>

            {!isPlaceholder && (
              <button
                type="button"
                onClick={() => handleCopy(selected.content, selected.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-purple-700 hover:bg-purple-600 text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép lệnh</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // NẾU TẤT CẢ CÁC MỤC ĐỀU LÀ PLACEHOLDER HOẶC MẢNG TRỐNG
  // =========================================================================
  if (validCommands.length === 0) {
    return (
      <div className="space-y-6 text-purple-100 py-12 px-4 max-w-2xl mx-auto text-center animate-in fade-in duration-300">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#24063f]/90 to-[#120224]/90 border border-purple-500/30 shadow-2xl space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-900/60 border border-purple-400/30 flex items-center justify-center text-pink-300 shadow-inner">
            <RefreshCw className="w-8 h-8 text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-amber-200">
              Lệnh chuyển sinh đang được cập nhật.
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/80 leading-relaxed max-w-md mx-auto">
              Chủ website Quỳnh Hoa Story Studio đang cập nhật nội dung cho các lệnh chuyển sinh. Vui lòng quay lại sau!
            </p>
          </div>

          {onBackToHome && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg transition cursor-pointer"
              >
                <Home className="w-4 h-4 text-amber-200" />
                <span>Trở về trang chủ Quỳnh Hoa Studio</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // GIAO DIỆN DANH SÁCH: SỬ DỤNG .map() VÀ KIỂM TRA PLACEHOLDER ĐỂ HIỂN THỊ
  // =========================================================================
  return (
    <div className="space-y-6 text-purple-100 animate-in fade-in duration-300">
      {/* Tiêu đề khu vực Lệnh chuyển sinh */}
      <div className="bg-gradient-to-r from-[#2a0845]/90 via-[#1b0530]/90 to-[#120224]/90 p-5 sm:p-6 rounded-2xl border border-purple-500/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <RefreshCw className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-pink-200">
              🔄 Lệnh Chuyển Sinh Nhân Vật
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-purple-300/90 leading-relaxed">
            Dành cho bạn đọc và người nhập vai cần chuyển bàn chat khi char vượt quá 200k – 300k tokens, giảm lag và bảo toàn trọn vẹn ký ức cốt truyện.
          </p>
        </div>

        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/30 text-purple-200 hover:text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm shrink-0"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Trang chủ</span>
          </button>
        )}
      </div>

      {/* Hiển thị danh sách các mục bằng .map(), ẩn placeholder nếu không có nội dung thực tế */}
      <div className="grid grid-cols-1 gap-4">
        {reincarnationCommands.map((cmd) => {
          // Kiểm tra nếu content là placeholder (chứa [...] hoặc chưa điền) thì ẩn đi
          if (!cmd || isPlaceholderContent(cmd.content)) {
            return null;
          }

          const cleanTitle = cleanPlaceholder(cmd.title);
          const cleanDesc = cleanPlaceholder(cmd.description);
          const isCopied = copiedId === cmd.id;

          return (
            <div
              key={cmd.id}
              className="bg-gradient-to-br from-[#1f0636]/90 via-[#17032a]/90 to-[#110121]/90 p-5 sm:p-6 rounded-2xl border border-purple-500/30 hover:border-pink-500/40 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Thông tin lệnh */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-800/60 text-pink-300 border border-purple-400/30 font-mono font-medium">
                    {cmd.id}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-amber-200 truncate">
                    {cleanTitle}
                  </h3>
                </div>

                {cleanDesc && (
                  <p className="text-xs sm:text-sm text-purple-200/80 line-clamp-2 leading-relaxed">
                    {cleanDesc}
                  </p>
                )}

                <div className="flex items-center gap-3 text-[11px] text-purple-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    Chỉ đọc & sao chép
                  </span>
                  <span>•</span>
                  <span>Bảo toàn mạch truyện</span>
                </div>
              </div>

              {/* Nút hành động: Xem lệnh & Sao chép */}
              <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setSelected(cmd)}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 hover:text-white border border-purple-400/40 font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  title="Xem toàn bộ lệnh"
                >
                  <BookOpen className="w-4 h-4 text-pink-300" />
                  <span>📖 Xem lệnh</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(cmd.content, cmd.id)}
                  className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                    isCopied
                      ? 'bg-emerald-600 text-white border border-emerald-400/50'
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white border border-pink-400/30'
                  }`}
                  title="Sao chép toàn bộ lệnh"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Đã sao chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>📋 Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ReincarnationManager = React.memo(ReincarnationManagerBase);
