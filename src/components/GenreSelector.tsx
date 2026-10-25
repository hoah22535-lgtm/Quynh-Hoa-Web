import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Check, Tag, ThumbsUp, Heart, Plus, Award } from 'lucide-react';
import { STORY_GENRES } from '../data/presets';
import { StoryGenre } from '../types';

interface GenreSelectorProps {
  selectedGenre: string;
  onChangeGenre: (genreName: string) => void;
}

const LOCAL_VOTES_KEY = 'quynh_hoa_genre_votes_v1';
const USER_VOTED_KEY = 'quynh_hoa_user_voted_genres_v1';

export const GenreSelector: React.FC<GenreSelectorProps> = ({
  selectedGenre,
  onChangeGenre,
}) => {
  // Vote counts state per genre ID
  const [votesMap, setVotesMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_VOTES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const initial: Record<string, number> = {};
    STORY_GENRES.forEach((g) => {
      initial[g.id] = g.votes || 0;
    });
    return initial;
  });

  // Track which genre IDs user voted for
  const [votedIds, setVotedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(USER_VOTED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom genre / Hashtag state
  const [customInput, setCustomInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [newHashtag, setNewHashtag] = useState<Record<string, string>>({});
  const [genreHashtags, setGenreHashtags] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    STORY_GENRES.forEach((g) => {
      initial[g.id] = g.hashtags || [];
    });
    return initial;
  });

  // Save votes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_VOTES_KEY, JSON.stringify(votesMap));
      localStorage.setItem(USER_VOTED_KEY, JSON.stringify(votedIds));
    } catch (e) {
      console.error(e);
    }
  }, [votesMap, votedIds]);

  const handleSelectGenre = (genreName: string) => {
    setIsCustomMode(false);
    onChangeGenre(genreName);
  };

  // Handle Vote Action
  const handleVote = (e: React.MouseEvent, genreId: string) => {
    e.stopPropagation(); // prevent triggering parent select if unwanted
    const isVoted = votedIds.includes(genreId);
    if (isVoted) {
      setVotesMap((prev) => ({
        ...prev,
        [genreId]: Math.max(0, (prev[genreId] || 1) - 1),
      }));
      setVotedIds((prev) => prev.filter((id) => id !== genreId));
    } else {
      setVotesMap((prev) => ({
        ...prev,
        [genreId]: (prev[genreId] || 0) + 1,
      }));
      setVotedIds((prev) => [...prev, genreId]);
    }
  };

  // Handle Add Custom Hashtag
  const handleAddHashtag = (genreId: string) => {
    const tag = (newHashtag[genreId] || '').trim();
    if (!tag) return;
    const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;
    setGenreHashtags((prev) => ({
      ...prev,
      [genreId]: [...(prev[genreId] || []), formattedTag],
    }));
    setNewHashtag((prev) => ({ ...prev, [genreId]: '' }));
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setIsCustomMode(true);
      onChangeGenre(customInput.trim());
    }
  };

  // Separate genres by categories: Cổ Trang & Hiện Đại
  const coTrangGenres = STORY_GENRES.filter((g) => g.category === 'co_trang');
  const hienDaiGenres = STORY_GENRES.filter((g) => g.category === 'hien_dai');

  return (
    <div
      id="genre-selector-section"
      className="bg-[#240a3d]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-500/30 shadow-xl relative overflow-hidden transition-all text-purple-100"
    >
      {/* Decorative White Flower Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />

      {/* Header & Vote Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <BookOpen className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                Thể Loại Cốt Truyện
              </h2>
              <span className="text-[11px] text-purple-200 bg-purple-900/80 px-2.5 py-0.5 rounded-full border border-purple-400/40">
                Cổ Trang & Hiện Đại
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5">
              Bình chọn cho thể loại bạn yêu thích nhất và thêm hashtag sáng tác!
            </p>
          </div>
        </div>

        {selectedGenre && (
          <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-800/80 border border-purple-400/40 text-amber-200 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Đã chọn: {selectedGenre}</span>
          </div>
        )}
      </div>

      {/* SECTION 1: CỔ TRANG */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏮</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              1. Thể Loại Cổ Trang
            </h3>
          </div>
          <span className="text-[11px] text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-500/30">
            Tu Tiên • Cung Đấu • Giang Hồ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coTrangGenres.map((genre) => {
            const isSelected = selectedGenre === genre.name && !isCustomMode;
            const voteCount = votesMap[genre.id] || 0;
            const hasVoted = votedIds.includes(genre.id);
            const tags = genreHashtags[genre.id] || [];

            return (
              <div
                key={genre.id}
                onClick={() => handleSelectGenre(genre.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 text-white border-purple-300 shadow-lg ring-2 ring-purple-400/50'
                    : 'bg-[#1e0736]/80 hover:bg-[#2b0c4c] border-purple-500/30 text-purple-100 hover:border-purple-400/60'
                }`}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-950/80 text-amber-200 border border-purple-400/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      {genre.name}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Check className="w-3.5 h-3.5" /> Đã chọn
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-purple-200/90 leading-relaxed mb-3">
                    {genre.description}
                  </p>

                  {/* Hashtags */}
                  <div className="mb-3 pt-2 border-t border-purple-500/20">
                    <div className="text-[10px] text-purple-300 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-purple-400" />
                      <span>Hashtag:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-400/30 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Add Custom Hashtag inline */}
                    <div className="mt-2 flex items-center gap-1">
                      <input
                        type="text"
                        value={newHashtag[genre.id] || ''}
                        onChange={(e) =>
                          setNewHashtag((prev) => ({
                            ...prev,
                            [genre.id]: e.target.value,
                          }))
                        }
                        onClick={(e) => e.stopPropagation()}
                        placeholder="+ Thêm hashtag..."
                        className="text-[10px] px-2 py-1 bg-purple-950/90 rounded border border-purple-500/30 text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-300 flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddHashtag(genre.id);
                        }}
                        className="p-1 rounded bg-purple-700 hover:bg-purple-600 text-white text-[10px] cursor-pointer"
                        title="Thêm hashtag"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vote Button Section */}
                <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                  <div className="text-[11px] text-purple-300">
                    <span className="text-amber-300 font-bold">
                      {voteCount.toLocaleString('vi-VN')}
                    </span>{' '}
                    lượt bình chọn
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleVote(e, genre.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      hasVoted
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'bg-purple-800/80 hover:bg-purple-700 text-purple-100 border border-purple-400/30'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        hasVoted ? 'fill-white text-white' : 'text-pink-300'
                      }`}
                    />
                    <span>
                      {hasVoted ? 'Đã bình chọn ❤️' : 'Bình chọn ngay'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: HIỆN ĐẠI */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏙️</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              2. Thể Loại Hiện Đại
            </h3>
          </div>
          <span className="text-[11px] text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-500/30">
            Tổng Tài • Hào Môn • Showbiz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hienDaiGenres.map((genre) => {
            const isSelected = selectedGenre === genre.name && !isCustomMode;
            const voteCount = votesMap[genre.id] || 0;
            const hasVoted = votedIds.includes(genre.id);
            const tags = genreHashtags[genre.id] || [];

            return (
              <div
                key={genre.id}
                onClick={() => handleSelectGenre(genre.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 text-white border-purple-300 shadow-lg ring-2 ring-purple-400/50'
                    : 'bg-[#1e0736]/80 hover:bg-[#2b0c4c] border-purple-500/30 text-purple-100 hover:border-purple-400/60'
                }`}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-950/80 text-amber-200 border border-purple-400/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-400" />
                      {genre.name}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Check className="w-3.5 h-3.5" /> Đã chọn
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-purple-200/90 leading-relaxed mb-3">
                    {genre.description}
                  </p>

                  {/* Hashtags */}
                  <div className="mb-3 pt-2 border-t border-purple-500/20">
                    <div className="text-[10px] text-purple-300 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-purple-400" />
                      <span>Hashtag:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-400/30 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Add Custom Hashtag inline */}
                    <div className="mt-2 flex items-center gap-1">
                      <input
                        type="text"
                        value={newHashtag[genre.id] || ''}
                        onChange={(e) =>
                          setNewHashtag((prev) => ({
                            ...prev,
                            [genre.id]: e.target.value,
                          }))
                        }
                        onClick={(e) => e.stopPropagation()}
                        placeholder="+ Thêm hashtag..."
                        className="text-[10px] px-2 py-1 bg-purple-950/90 rounded border border-purple-500/30 text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-300 flex-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddHashtag(genre.id);
                        }}
                        className="p-1 rounded bg-purple-700 hover:bg-purple-600 text-white text-[10px] cursor-pointer"
                        title="Thêm hashtag"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vote Button Section */}
                <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                  <div className="text-[11px] text-purple-300">
                    <span className="text-amber-300 font-bold">
                      {voteCount.toLocaleString('vi-VN')}
                    </span>{' '}
                    lượt bình chọn
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleVote(e, genre.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      hasVoted
                        ? 'bg-pink-600 text-white shadow-md'
                        : 'bg-purple-800/80 hover:bg-purple-700 text-purple-100 border border-purple-400/30'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        hasVoted ? 'fill-white text-white' : 'text-pink-300'
                      }`}
                    />
                    <span>
                      {hasVoted ? 'Đã bình chọn ❤️' : 'Bình chọn ngay'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Genre Option */}
      <div className="pt-3 border-t border-purple-500/30">
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400">
              <Tag className="w-4 h-4" />
            </div>
            <input
              id="input-custom-genre"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Nhập thể loại tùy chỉnh khác (Ví dụ: Xuyên Không Phản Diện, Cyberpunk Đô Thị, Mạt Thế...)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#17052e] rounded-xl border border-purple-500/40 text-xs text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>
          <button
            id="btn-apply-custom-genre"
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors disabled:opacity-40 cursor-pointer shrink-0"
          >
            Áp dụng
          </button>
        </form>
      </div>
    </div>
  );
};

