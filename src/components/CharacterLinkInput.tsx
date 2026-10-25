import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Crown, Send, Share2, Check, Lock, ExternalLink, Flower2, Plus, Trash2, UserCheck, MoreVertical, Edit3, Tag, Quote, BarChart2, RefreshCw, FileText } from 'lucide-react';
import { CharacterInfo, PresetCharacter } from '../types';
import { getVisitorStats } from '../lib/analytics';

const AUTHORIZED_PUBLISHER_EMAIL = 'hoah22535@gmail.com';
const LOCAL_PUBLISHED_CHARS_KEY = 'quynh_hoa_published_chars_v2';

interface CharacterLinkInputProps {
  character: CharacterInfo;
  onChange: (updated: CharacterInfo) => void;
  onSelectPreset?: (preset: PresetCharacter) => void;
  isLoadingAnalysis?: boolean;
  onAnalyzeLink?: (url: string) => void;
  onStartDirectChat?: (char?: CharacterInfo | PresetCharacter, targetLink?: string) => void;
  onSaveCurrentMode?: () => void;
  isViewOnly?: boolean;
  userEmail?: string;
}

const hashtagCache = new Map<string, string[]>();

// Helper to parse and supply distinct hashtags for each character with memory caching
export const getCharacterHashtags = (charItem: CharacterInfo): string[] => {
  const cacheKey = `${charItem.id || charItem.name}::${charItem.hashtag || ''}`;
  const cached = hashtagCache.get(cacheKey);
  if (cached) return cached;

  const isChinhDuong =
    charItem.name?.trim().toLowerCase() === 'chính dương' ||
    charItem.id === 'chinh-duong';

  let result: string[] = [];

  // For Chính Dương: strictly provide the requested hashtags if default or outdated
  if (isChinhDuong) {
    if (
      !charItem.hashtag ||
      charItem.hashtag.includes('CổĐại') ||
      charItem.hashtag.includes('VươngGia') ||
      charItem.hashtag.includes('QuyềnMưu') ||
      !charItem.hashtag.includes('TrâuGiàGặmCỏNon')
    ) {
      result = ['#CổTrang', '#TrâuGiàGặmCỏNon', '#HoàngĐế&SủngPhi', '#CungĐấu'];
      hashtagCache.set(cacheKey, result);
      return result;
    }
  }

  // If character has their own custom hashtag, parse it into an array of tags
  if (charItem.hashtag && charItem.hashtag.trim()) {
    if (charItem.hashtag.includes('#')) {
      const tags = charItem.hashtag
        .split('#')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => `#${t}`);
      if (tags.length > 0) {
        hashtagCache.set(cacheKey, tags);
        return tags;
      }
    }

    const rawTokens = charItem.hashtag
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter(Boolean);
    const tags = rawTokens.map((t) => (t.startsWith('#') ? t : `#${t}`));
    if (tags.length > 0) {
      hashtagCache.set(cacheKey, tags);
      return tags;
    }
  }

  // Fallback for Chính Dương
  if (isChinhDuong) {
    result = ['#CổTrang', '#TrâuGiàGặmCỏNon', '#HoàngĐế&SủngPhi', '#CungĐấu'];
  }

  hashtagCache.set(cacheKey, result);
  return result;
};

const CharacterLinkInputBase: React.FC<CharacterLinkInputProps> = ({
  character,
  onChange,
  onStartDirectChat,
  onSaveCurrentMode,
  isViewOnly = false,
  userEmail = 'hoah22535@gmail.com',
}) => {
  // NPH Token & Verification State
  const [nphToken, setNphToken] = useState<string>(() => {
    return localStorage.getItem('quynh_hoa_nph_token') || '';
  });
  const [isAuthorizedPublisher, setIsAuthorizedPublisher] = useState<boolean>(false);
  const [showNphLoginModal, setShowNphLoginModal] = useState<boolean>(false);
  const [nphPasswordInput, setNphPasswordInput] = useState<string>('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);

  // List of Published Characters on Homepage
  const [publishedChars, setPublishedChars] = useState<CharacterInfo[]>([]);

  // Verify NPH Token on Mount & When Token Changes
  useEffect(() => {
    if (!nphToken) {
      setIsAuthorizedPublisher(false);
      return;
    }
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${nphToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.isPublisher) {
          setIsAuthorizedPublisher(true);
        } else {
          setIsAuthorizedPublisher(false);
        }
      })
      .catch(() => setIsAuthorizedPublisher(false));
  }, [nphToken]);

  // Load Characters from Backend API (/api/characters)
  const loadCharactersFromServer = async () => {
    try {
      const res = await fetch('/api/characters');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.characters) && data.characters.length > 0) {
        setPublishedChars(data.characters);
        try {
          localStorage.setItem(LOCAL_PUBLISHED_CHARS_KEY, JSON.stringify(data.characters));
        } catch (e) {}
        return;
      }
    } catch (e) {
      console.error('Error fetching characters from server:', e);
    }

    // Fallback to localStorage if network fails
    try {
      const savedList = localStorage.getItem(LOCAL_PUBLISHED_CHARS_KEY);
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPublishedChars(parsed);
          return;
        }
      }
    } catch (e) {}

    // Ultimate fallback if no data
    const defaultChar: CharacterInfo = {
      id: 'chinh-duong',
      name: 'Chính Dương',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      hashtag: '#CổTrang #TrâuGiàGặmCỏNon #HoàngĐế&SủngPhi #CungĐấu',
      slogan: 'Dẫu cạn kiếp này, ta vẫn mãi chờ nàng dưới vòm Hoa Quỳnh trắng.',
      intro: 'Vương gia Chính Dương phong thái uy nghiêm, u buồn thâm tình.',
      description: 'Gương mặt tuấn tú sắc sảo, ánh mắt dịu dàng thâm thẫm dành riêng cho nàng.',
      personality: 'Uy nghiêm, ôn hòa, thâm tình, sâu sắc',
      link: 'https://www.dokichat.club/vi/role/afc87433-c3b8-4a05-bb2a-f7d7e4f3c28e?isShare=true',
      linkDokichat: 'https://www.dokichat.club/vi/role/afc87433-c3b8-4a05-bb2a-f7d7e4f3c28e?isShare=true',
      linkGgai: 'https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221NjC2ex3B6Xi_LVbbVzrNiQ0FUCu9MmNg%22%5D,%22action%22:%22open%22,%22userId%22:%22117415526578899640039%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing',
      linkImely: '',
      sourceType: 'custom_preset',
    };
    setPublishedChars([defaultChar]);
  };

  useEffect(() => {
    loadCharactersFromServer();
  }, []);

  // Selected Active Character Index on Homepage
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sync active char when publishedChars changes
  useEffect(() => {
    if (publishedChars.length > 0 && activeCharIndex >= 0 && activeCharIndex < publishedChars.length) {
      const selected = publishedChars[activeCharIndex];
      if (character?.id !== selected.id || character?.name !== selected.name) {
        onChange(selected);
      }
    }
  }, [activeCharIndex, publishedChars, character?.id, character?.name, onChange]);

  // Modal & Menu UI States
  const [showPublisherPortal, setShowPublisherPortal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showThreeDotsForIndex, setShowThreeDotsForIndex] = useState<number | null>(null);
  const [showChatModesForIndex, setShowChatModesForIndex] = useState<number | null>(0);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [copiedGgaiLink, setCopiedGgaiLink] = useState(false);

  // Original Story Modal State
  const [selectedStoryChar, setSelectedStoryChar] = useState<CharacterInfo | null>(null);
  const [copiedStory, setCopiedStory] = useState(false);

  // Lock body scroll and allow ESC to close when original story modal is open
  useEffect(() => {
    if (selectedStoryChar) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedStoryChar(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedStoryChar]);

  const handleCopyStory = () => {
    if (!selectedStoryChar?.storyContent) return;
    navigator.clipboard.writeText(selectedStoryChar.storyContent).then(() => {
      setCopiedStory(true);
      setTimeout(() => setCopiedStory(false), 2000);
    }).catch(() => {});
  };

  // Sort order state: 'asc' (A-Z) or 'desc' (Z-A)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedHashtag, setSelectedHashtag] = useState<string>('all');

  const categories = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Hiện Đại', value: 'HiệnĐại' },
    { label: 'Cổ Trang', value: 'CổTrang' },
    { label: 'Xuyên Không', value: 'XuyênKhông' },
    { label: 'Việt Nam Xưa', value: 'ViệtNamXưa' },
    { label: 'Dân Quốc', value: 'DânQuốc' },
    { label: 'Thượng Lưu & Hào Môn', value: 'ThượngLưu' },
    { label: 'Giam Cầm & Tội Phạm', value: 'GiamCầm' },
  ];

  const [isReloading, setIsReloading] = useState(false);
  const handleReload = async () => {
    setIsReloading(true);
    await loadCharactersFromServer();
    setIsReloading(false);
  };

  // Filtered and sorted characters based on search term, hashtag filter, and sort order
  const filteredCharacters = useMemo(() => publishedChars
    .filter((char) => {
      const matchesSearch =
        char.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.hashtag?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const cleanHashtag = (char.hashtag || '').replace(/\s+/g, '').toLowerCase();
      const cleanFilter = selectedHashtag.replace(/\s+/g, '').toLowerCase();

      const matchesHashtag =
        selectedHashtag === 'all' ||
        (char.hashtag && char.hashtag.toLowerCase().includes(selectedHashtag.toLowerCase())) ||
        cleanHashtag.includes(cleanFilter);

      return matchesSearch && matchesHashtag;
    })
    .sort((a, b) => {
      const res = (a.name || '').localeCompare(b.name || '', 'vi', { sensitivity: 'base' });
      if (res !== 0) {
        return sortOrder === 'asc' ? res : -res;
      }
      return a.id.localeCompare(b.id);
    }), [publishedChars, searchTerm, selectedHashtag, sortOrder]);

  // Publisher Form State
  const [pubName, setPubName] = useState('');
  const [pubHashtag, setPubHashtag] = useState('');
  const [pubSlogan, setPubSlogan] = useState('');
  const [pubDesc, setPubDesc] = useState('');
  const [pubStory, setPubStory] = useState('');
  const [pubDokichat, setPubDokichat] = useState('');
  const [pubGgai, setPubGgai] = useState('');
  const [pubImely, setPubImely] = useState('');

  // NPH Login Handler
  const handleNphLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nphPasswordInput.trim()) {
      alert('Vui lòng nhập mật khẩu Nhà Phát Hành!');
      return;
    }
    setIsSubmittingLogin(true);
    try {
      const res = await fetch('/api/auth/nph-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: AUTHORIZED_PUBLISHER_EMAIL, password: nphPasswordInput.trim() }),
      });
      const data = await res.json();
      if (data && data.success && data.token) {
        localStorage.setItem('quynh_hoa_nph_token', data.token);
        setNphToken(data.token);
        setIsAuthorizedPublisher(true);
        setShowNphLoginModal(false);
        setNphPasswordInput('');
        alert('👑 ĐĂNG NHẬP NHÀ PHÁT HÀNH THÀNH CÔNG!\n\nBạn đã được cấp quyền Quản Trị toàn bộ Nhân Vật & Link Chat.');
      } else {
        alert('❌ ' + (data.error || 'Mật khẩu Nhà Phát Hành không chính xác!'));
      }
    } catch (err: any) {
      alert('Lỗi đăng nhập: ' + err.message);
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleNphLogout = () => {
    localStorage.removeItem('quynh_hoa_nph_token');
    setNphToken('');
    setIsAuthorizedPublisher(false);
    alert('Đã đăng xuất khỏi tài khoản NPH.');
  };

  // Open Publisher Portal for Adding NEW Character
  const handleOpenAddNewModal = () => {
    if (!isAuthorizedPublisher) {
      setShowNphLoginModal(true);
      return;
    }
    setEditingIndex(null);
    setPubName('');
    setPubHashtag('');
    setPubSlogan('');
    setPubDesc('');
    setPubStory('');
    setPubDokichat('');
    setPubGgai('');
    setPubImely('');
    setShowPublisherPortal(true);
  };

  // Open Publisher Portal for EDITING existing Character
  const handleEditCharClick = (idx: number) => {
    setShowThreeDotsForIndex(null);
    if (!isAuthorizedPublisher) {
      setShowNphLoginModal(true);
      return;
    }

    const targetChar = publishedChars[idx];
    setEditingIndex(idx);
    setPubName(targetChar.name || '');
    setPubHashtag(targetChar.hashtag || '');
    setPubSlogan(targetChar.slogan || '');
    setPubDesc(targetChar.intro || targetChar.description || '');
    setPubStory(targetChar.storyContent || targetChar.intro || targetChar.description || '');
    setPubDokichat(targetChar.linkDokichat || targetChar.link || '');
    setPubGgai(targetChar.linkGgai || '');
    setPubImely(targetChar.linkImely || '');
    setShowPublisherPortal(true);
  };

  // Delete Character Handler (Only for Authenticated NPH)
  const handleDeleteChar = async (idx: number) => {
    setShowThreeDotsForIndex(null);
    if (!isAuthorizedPublisher || !nphToken) {
      setShowNphLoginModal(true);
      return;
    }

    const targetChar = publishedChars[idx];
    if (!targetChar || !targetChar.id) return;

    if (!confirm(`Bạn có chắc chắn muốn xóa nhân vật "${targetChar.name}" không?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/characters/${targetChar.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${nphToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert('❌ Lỗi: ' + (data.error || 'Không thể xóa nhân vật!'));
        return;
      }
      if (data.characters) {
        setPublishedChars(data.characters);
        try {
          localStorage.setItem(LOCAL_PUBLISHED_CHARS_KEY, JSON.stringify(data.characters));
        } catch (e) {}
        if (activeCharIndex >= data.characters.length) {
          setActiveCharIndex(0);
        }
      }
      alert(`🗑️ Đã xóa nhân vật "${targetChar.name}" thành công!`);
    } catch (err: any) {
      alert('Lỗi xóa nhân vật: ' + err.message);
    }
  };

  // Official Public URL constant
  const OFFICIAL_PUBLIC_URL = 'https://quy-nh-hoa-story-studio.ai.studio';

  // Save (Add or Edit) Character Handler
  const handleSaveCharToHomepage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthorizedPublisher || !nphToken) {
      alert('🔒 Chỉ Nhà Phát Hành đã xác thực mới có quyền truy cập chỉnh sửa.');
      return;
    }

    if (!pubName.trim()) {
      alert('Vui lòng nhập tên nhân vật!');
      return;
    }

    const mainLink = pubDokichat.trim() || pubGgai.trim() || pubImely.trim();

    const payload = {
      name: pubName.trim(),
      avatar: '',
      hashtag: pubHashtag.trim(),
      slogan: pubSlogan.trim(),
      intro: pubDesc.trim(),
      description: pubDesc.trim(),
      storyContent: (pubStory.trim() || pubDesc.trim()),
      personality: 'Uy nghiêm, ôn hòa, thâm tình, sâu sắc',
      link: mainLink,
      linkDokichat: pubDokichat.trim(),
      linkGgai: pubGgai.trim(),
      linkImely: pubImely.trim(),
      sourceType: 'custom_preset',
    };

    try {
      let res;
      if (editingIndex !== null && publishedChars[editingIndex]) {
        const targetId = publishedChars[editingIndex].id || 'chinh-duong';
        res = await fetch(`/api/characters/${targetId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${nphToken}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/characters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${nphToken}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert('❌ Lỗi: ' + (data.error || 'Không thể lưu nhân vật!'));
        return;
      }

      if (data.characters) {
        setPublishedChars(data.characters);
        try {
          localStorage.setItem(LOCAL_PUBLISHED_CHARS_KEY, JSON.stringify(data.characters));
        } catch (e) {}
        if (editingIndex === null) {
          setActiveCharIndex(data.characters.length - 1);
        }
      }
      alert(editingIndex !== null ? `🎉 ĐÃ CẬP NHẬT HOÀN THIỆN CHAR "${pubName.trim()}" THÀNH CÔNG!` : `🎉 ĐÃ THÊM CHAR "${pubName.trim()}" LÊN TRANG CHỦ THÀNH CÔNG!`);
      setShowPublisherPortal(false);
    } catch (err: any) {
      alert('Lỗi lưu nhân vật: ' + err.message);
    }
  };

  // Helper to ensure public shared app URL
  const getPublicBaseUrl = () => {
    return OFFICIAL_PUBLIC_URL;
  };

  // State for custom studio profile link (optional)
  const [studioProfileUrl, setStudioProfileUrl] = useState(() => {
    return localStorage.getItem('quynh_hoa_studio_profile_url') || '';
  });

  // Open & Share Studio Profile Link Handler (Directly opens https://ai.studio/apps/f95616ef-4ae4-487b-a3df-e7fb854631a4 in new tab)
  const handleShareStudioHomepage = (charName?: string) => {
    setShowThreeDotsForIndex(null);
    const studioUrl = 'https://ai.studio/apps/f95616ef-4ae4-487b-a3df-e7fb854631a4';

    if (navigator.share) {
      navigator.share({
        title: 'Quỳnh Hoa - Đêm Tím Mộng Mơ',
        text: `Ghé thăm Quỳnh Hoa Story Studio: Cốt Truyện Nhập Vai cùng ${charName || 'Chính Dương'}`,
        url: studioUrl,
      }).catch(() => {});
    }

    try {
      navigator.clipboard.writeText(studioUrl);
    } catch (e) {
      console.error(e);
    }
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 3000);

    // Mở đúng URL trong tab mới
    window.open(studioUrl, '_blank', 'noopener,noreferrer');
  };

  // Share & Open Universal GGAI Studio Link Handler
  const handleShareGgaiStudio = (charName?: string) => {
    setShowThreeDotsForIndex(null);
    const ggaiShareUrl = OFFICIAL_PUBLIC_URL;

    if (navigator.share) {
      navigator.share({
        title: 'Quỳnh Hoa - Đêm Tím Mộng Mơ',
        text: `Ghé thăm Quỳnh Hoa - Đêm Tím Mộng Mơ: Cốt Truyện Nhập Vai cùng ${charName || 'Chính Dương'}`,
        url: ggaiShareUrl,
      }).catch(() => {});
    }

    try {
      navigator.clipboard.writeText(ggaiShareUrl);
    } catch (e) {
      console.error(e);
    }
    setCopiedGgaiLink(true);
    setTimeout(() => setCopiedGgaiLink(false), 3000);

    window.open(ggaiShareUrl, '_blank', 'noopener,noreferrer');
  };

  // Helper to ensure valid URL
  const formatExternalUrl = (url: string) => {
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div
      id="character-link-section"
      className="bg-[#240a3d]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-500/30 shadow-xl relative overflow-hidden transition-all text-purple-100"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 blur-2xl rounded-full pointer-events-none" />

      {/* TOP PUBLISHER PORTAL BANNER (Only when authorized NPH is logged in) */}
      {isAuthorizedPublisher && (
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#2c084d] via-[#1f0538] to-[#280747] border-2 border-amber-400/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-pink-600 text-white flex items-center justify-center font-bold shadow-md shrink-0 border border-amber-300/40">
              <Crown className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-amber-200 font-serif">
                  Tài Khoản Nhà Phát Hành Đã Xác Thực
                </h3>
                <span className="text-[10px] text-amber-100 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-400/40 font-semibold flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-amber-300" />
                  <span>NPH: hoah22535@gmail.com</span>
                </span>
                <span className="text-[10px] text-emerald-200 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/40 font-semibold flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-emerald-300 animate-pulse" />
                  <span>GA Views: {getVisitorStats().totalViews}</span>
                </span>
              </div>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Bạn có toàn quyền Thêm, Sửa, Xóa nhân vật và quản lý các link chat chính thức.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAddNewModal}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 border border-amber-300/50"
            >
              <Plus className="w-4 h-4 text-amber-200" />
              <span>Thêm Char Mới +</span>
            </button>
            <button
              type="button"
              onClick={handleNphLogout}
              className="px-3 py-2 bg-purple-950 hover:bg-purple-900 text-purple-300 font-medium text-xs rounded-xl border border-purple-500/30 cursor-pointer"
              title="Đăng xuất khỏi quyền Nhà Phát Hành"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      {/* Main Header Label */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-purple-700 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <Flower2 className="w-5 h-5 text-pink-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                Char nhà Quỳnh Hoa
              </h2>
              <span className="text-[11px] text-pink-200 bg-purple-900/80 px-2.5 py-0.5 rounded-full border border-purple-400/40 font-semibold">
                {publishedChars.length} Char đã lên trang chủ
              </span>
            </div>
            <p className="text-xs text-pink-200/90 font-serif italic mt-1 leading-snug">
              Xuân hạ thu đông thường tại thử,<br />
              Nhật dạ đẳng nhĩ quy lai thời.
            </p>
          </div>
        </div>

        {/* Action Buttons: (Removed as requested) */}
      </div>

      {/* II. NHẮM MẮT CHỌN CHỒNG */}
      <div className="mb-6 pt-2 pb-4 border-b border-purple-500/30">
        <div className="text-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-purple-100 flex items-center justify-center gap-2 leading-tight">
            <span>✦</span>
            <span>Nhắm Mắt Chọn Chồng</span>
            <span>✦</span>
          </h3>
          <p className="text-[11px] text-purple-300/80 mt-1 mb-4">
            {publishedChars.length > 1
              ? 'Chọn một nhân vật để mở liên kết trò chuyện và thưởng thức cốt truyện'
              : 'Khu vực liên kết trò chuyện và thưởng thức cốt truyện nhân vật'}
          </p>

          {/* Thanh tìm kiếm và Sắp xếp */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc hashtag..."
              className="w-full sm:flex-1 px-4 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-purple-100 placeholder-purple-500 focus:outline-none focus:border-pink-400 text-sm shadow-inner"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full sm:w-auto px-3 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-purple-200 text-sm focus:outline-none focus:border-pink-400 shadow-inner cursor-pointer"
            >
              <option value="asc">Tên A–Z</option>
              <option value="desc">Tên Z–A</option>
            </select>
          </div>

          {/* Thanh điều hướng bộ lọc hashtag */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-2 w-full">
            <button
              onClick={handleReload}
              disabled={isReloading}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer bg-[#240a3d] border border-purple-500/50 text-purple-200 hover:text-white hover:border-pink-400 ${isReloading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <RefreshCw className={`w-3 h-3 inline-block mr-1 ${isReloading ? 'animate-spin' : ''}`} />
              {isReloading ? 'Đang tải...' : 'Tải lại'}
            </button>
            {categories.map((cat) => {
              const isActive = selectedHashtag === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedHashtag(cat.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.4)] border border-pink-300 scale-105'
                      : 'bg-[#18042c] text-purple-200/80 border border-purple-500/30 hover:border-pink-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lưới các ô tên nhân vật */}
        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {filteredCharacters.map((item) => {
              const isSelected = item.id === publishedChars[activeCharIndex]?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    const originalIndex = publishedChars.findIndex((c) => c.id === item.id);
                    if (originalIndex !== -1) {
                      setActiveCharIndex(originalIndex);
                    }
                  }}
                  className={`w-full py-3 px-3 rounded-xl font-serif text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center select-none ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#3b0b5f] via-[#4a0d6b] to-[#3b0b5f] text-white border-2 border-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.45)] ring-1 ring-pink-300 scale-[1.02]'
                      : 'bg-[#18042c]/95 text-purple-200/90 border border-purple-400/40 hover:border-pink-400 hover:text-white hover:bg-[#250742] hover:shadow-[0_0_12px_rgba(216,180,254,0.3)] hover:scale-105 hover:brightness-110'
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  {item.id === 'tran-huu-khiem-chinh-that' && (
                    <span className="text-[10px] text-pink-300 font-sans font-normal leading-none mt-1 opacity-90">Bản Chính Thất</span>
                  )}
                  {item.id === 'tran-huu-khiem' && (
                    <span className="text-[10px] text-purple-300 font-sans font-normal leading-none mt-1 opacity-80">Anh Em Nuôi</span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-purple-400 text-sm py-4">Không tìm thấy nhân vật nào phù hợp.</p>
        )}
      </div>

      {/* III. KHU VỰC LIÊN KẾT CỦA NHÂN VẬT ĐƯỢC CHỌN (THẺ GẦN VUÔNG, CÂN ĐỐI TRUNG TÂM) */}
      {publishedChars.length > 0 && publishedChars[activeCharIndex] && (
        (() => {
          const item = publishedChars[activeCharIndex];
          const idx = activeCharIndex;
          const dokichatUrl = (item.linkDokichat && item.linkDokichat.trim()) || (item.link && item.link.includes('dokichat') ? item.link.trim() : '');
          const defaultGgaiStudioUrl = `${getPublicBaseUrl()}?mode=ggai&studio=quynh_hoa_ggai&char=${encodeURIComponent(item.name || 'QuynhHoa')}`;
          const ggaiUrl = item.linkGgai || (item.link && !item.link.includes('dokichat') ? item.link : '') || defaultGgaiStudioUrl;
          const charHashtags = getCharacterHashtags(item);

          const isTaKinhDuc = item.id === 'ta-kinh-duc';
          const isTranHuuKhiemChinhThat = item.id === 'tran-huu-khiem-chinh-that';
          const showDokichat = Boolean(dokichatUrl && dokichatUrl.trim() && !isTaKinhDuc && !isTranHuuKhiemChinhThat);

          return (
            <div className="flex justify-center items-center w-full my-4 px-2 sm:px-4">
              <div
                key={item.id || `selected-char-${idx}`}
                className="relative w-full max-w-[420px] sm:max-w-[450px] rounded-3xl border-2 border-pink-400/50 bg-gradient-to-b from-[#260844] via-[#1a0530] to-[#130225] p-5 sm:p-6 shadow-[0_12px_40px_rgba(236,72,153,0.28)] backdrop-blur-md flex flex-col space-y-4 overflow-hidden group transition-all duration-300 hover:shadow-[0_16px_50px_rgba(236,72,153,0.38)] hover:border-pink-300/70"
              >
                {/* Hiệu ứng ánh sáng tím hồng huyền ảo */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

                {/* 1. PHẦN TRÊN: Tiêu đề nhỏ, Tên nhân vật & Các Hashtag */}
                <div className="relative z-10 text-center space-y-2">


                  {/* Tên nhân vật */}
                  <div className="pt-1">
                    <h4 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-pink-200 drop-shadow-sm">
                      {item.name}
                    </h4>
                  </div>

                  {/* HASHTAG RIÊNG CỦA NHÂN VẬT: Nhãn nhỏ bo tròn, chữ dễ đọc, màu hồng phấn & tím lavender */}
                  {charHashtags.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                      {charHashtags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-[#36104f]/90 text-pink-200 border border-purple-400/40 shadow-sm hover:border-pink-300 hover:text-white transition-all select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>



                {/* 3. PHẦN DƯỚI: Các nút liên kết */}
                <div className="relative z-10 pt-4">
                  <div className={`grid ${showDokichat ? 'grid-cols-3' : 'grid-cols-2'} gap-2.5`}>
                    {/* 1. NÚT LINK GGAI */}
                    {ggaiUrl ? (
                      <a
                        href={formatExternalUrl(ggaiUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-3 rounded-xl bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 hover:from-purple-600 hover:to-pink-500 text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 border border-pink-300/40 hover:scale-[1.02] active:scale-95 no-underline text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                        <span>Link GGAI</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="py-3 px-3 rounded-xl bg-[#120224] text-purple-400/60 font-semibold text-xs border border-purple-900/60 cursor-not-allowed opacity-80"
                      >
                        Chưa có link GGAI
                      </button>
                    )}
                    {/* 2. NÚT LINK DOKICHAT */}
                    {showDokichat && (
                      <a
                        href={formatExternalUrl(dokichatUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 border border-rose-300/40 hover:scale-[1.02] active:scale-95 no-underline text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                        <span>Link Dokichat</span>
                      </a>
                    )}
                    {/* 3. NÚT 📖 CỐT TRUYỆN GỐC */}
                    <button
                      type="button"
                      onClick={() => setSelectedStoryChar(item)}
                      className="py-3 px-3 rounded-xl bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-800 hover:from-indigo-600 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 border border-indigo-300/40 hover:scale-[1.02] active:scale-95 text-center"
                      title={`Xem cốt truyện gốc của ${item.name}`}
                    >
                      <span className="text-sm">📖</span>
                      <span>Cốt truyện gốc</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* PUBLISHER PORTAL MODAL (Add or Edit Character) */}
      {showPublisherPortal && isAuthorizedPublisher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#240a3d] rounded-2xl max-w-lg w-full shadow-2xl border-2 border-amber-400/50 p-5 sm:p-6 text-purple-100 space-y-4 relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40 shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">
                    {editingIndex !== null ? 'Chỉnh Sửa Hoàn Thiện Char (NPH)' : 'Cổng Đưa Char Tự Do Lên Trang Chủ (NPH)'}
                  </h3>
                  <p className="text-xs text-purple-200/80">
                    Cập nhật đầy đủ tên, hashtag, slogan, giới thiệu và 3 link chat của nhân vật
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPublisherPortal(false)}
                className="w-8 h-8 rounded-full bg-purple-900 hover:bg-purple-800 text-purple-200 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Fields required by prompt */}
            <form onSubmit={handleSaveCharToHomepage} className="space-y-3.5 text-xs">
              {/* 1. Tên Nhân Vật */}
              <div>
                <label className="block font-semibold text-amber-200 mb-1">Tên Nhân Vật *</label>
                <input
                  type="text"
                  required
                  value={pubName}
                  onChange={(e) => setPubName(e.target.value)}
                  placeholder="Ví dụ: Lạc Vân Hi / Dạ Tiêu Y / Sở Vẫn..."
                  className="w-full px-3 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-white font-medium focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 2. Hashtag (do NPH tự ghi, không giới thiệu) */}
              <div>
                <label className="block font-semibold text-pink-300 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-pink-300" />
                  <span>Hashtag (Do NPH tự ghi, không giới thiệu)</span>
                </label>
                <input
                  type="text"
                  value={pubHashtag}
                  onChange={(e) => setPubHashtag(e.target.value)}
                  placeholder="Ví dụ: #CổĐại #ThầnY #ThâmTình #CungĐấu"
                  className="w-full px-3 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                />
              </div>

              {/* 3. Slogan của char */}
              <div>
                <label className="block font-semibold text-amber-300 mb-1 flex items-center gap-1">
                  <Quote className="w-3.5 h-3.5 text-amber-300" />
                  <span>Slogan Của Char</span>
                </label>
                <input
                  type="text"
                  value={pubSlogan}
                  onChange={(e) => setPubSlogan(e.target.value)}
                  placeholder="Ví dụ: Dẫu cạn kiếp này, ta vẫn mãi đợi nàng dưới vòm Hoa Anh Đào."
                  className="w-full px-3 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-white italic focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 4. Giới Thiệu Nhân Vật */}
              <div>
                <label className="block font-semibold text-purple-200 mb-1">Giới Thiệu Nhân Vật</label>
                <textarea
                  rows={2}
                  value={pubDesc}
                  onChange={(e) => setPubDesc(e.target.value)}
                  placeholder="Mô tả bối cảnh, ngoại hình, xuất thân nhân vật..."
                  className="w-full px-3 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-white focus:outline-none focus:border-amber-400 resize-y"
                />
              </div>

              {/* 5. Nội Dung Cốt Truyện Nhân Vật */}
              <div>
                <label className="block font-semibold text-pink-300 mb-1 flex items-center gap-1">
                  <span>📖 Nội Dung Cốt Truyện / Tiểu Sử Nhân Vật</span>
                </label>
                <textarea
                  rows={4}
                  value={pubStory}
                  onChange={(e) => setPubStory(e.target.value)}
                  placeholder="Nhập toàn bộ nội dung hoặc trích đoạn cốt truyện của chính nhân vật này để độc giả thưởng thức..."
                  className="w-full px-3 py-2 bg-[#120224] border border-purple-500/40 rounded-xl text-white focus:outline-none focus:border-pink-400 resize-y leading-relaxed"
                />
              </div>

              {/* 5. Đường Link Char: Dokichat, GGAI, Imely */}
              <div className="p-3.5 rounded-xl bg-[#130324] border border-purple-500/30 space-y-2.5">
                <label className="block font-bold text-amber-300">Đường Link Char (3 Chế Độ Chat):</label>

                <div>
                  <label className="block text-[11px] text-pink-300 mb-0.5">1. Link Dokichat</label>
                  <input
                    type="url"
                    value={pubDokichat}
                    onChange={(e) => setPubDokichat(e.target.value)}
                    placeholder="https://dokichat..."
                    className="w-full px-3 py-1.5 bg-[#1e0536] border border-purple-500/40 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-amber-300 mb-0.5">2. Link GGAI</label>
                  <input
                    type="url"
                    value={pubGgai}
                    onChange={(e) => setPubGgai(e.target.value)}
                    placeholder="https://ggai..."
                    className="w-full px-3 py-1.5 bg-[#1e0536] border border-purple-500/40 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-indigo-300 mb-0.5">3. Link Imely</label>
                  <input
                    type="url"
                    value={pubImely}
                    onChange={(e) => setPubImely(e.target.value)}
                    placeholder="https://imely..."
                    className="w-full px-3 py-1.5 bg-[#1e0536] border border-purple-500/40 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>
                    {editingIndex !== null ? '🚀 Lưu Cập Nhật Hoàn Thiện Char' : '🚀 Đưa Char Này Lên Trang Chủ Ngay'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPublisherPortal(false)}
                  className="px-4 py-3 bg-purple-900 hover:bg-purple-800 text-purple-200 font-bold text-xs rounded-xl cursor-pointer border border-purple-500/30"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* NPH LOGIN MODAL */}
      {showNphLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#240a3d] rounded-2xl max-w-md w-full shadow-2xl border-2 border-amber-400/50 p-6 text-purple-100 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600" />

            <div className="flex items-center justify-between pb-3 border-b border-purple-500/30">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-amber-300" />
                <h3 className="text-base font-bold text-white font-serif">Đăng Nhập Nhà Phát Hành</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNphLoginModal(false)}
                className="w-8 h-8 rounded-full bg-purple-900 text-purple-200 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-purple-200/90 leading-relaxed">
              Quyền chỉnh sửa, thêm, xóa nhân vật chỉ dành riêng cho Nhà Phát Hành (<strong>hoah22535@gmail.com</strong>).
            </p>

            <form onSubmit={handleNphLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-purple-200 mb-1">Email NPH</label>
                <input
                  type="email"
                  disabled
                  value={AUTHORIZED_PUBLISHER_EMAIL}
                  className="w-full px-3 py-2 bg-[#120224]/80 border border-purple-500/30 rounded-xl text-amber-300 font-mono text-xs opacity-90 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-amber-200 mb-1">Mật khẩu Nhà Phát Hành *</label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={nphPasswordInput}
                  onChange={(e) => setNphPasswordInput(e.target.value)}
                  placeholder="Nhập mật khẩu NPH..."
                  className="w-full px-3 py-2 bg-[#120224] border border-amber-400/50 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmittingLogin}
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-200" />
                  <span>{isSubmittingLogin ? 'Đang xác thực...' : 'Xác Nhận Đăng Nhập'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowNphLoginModal(false)}
                  className="px-4 py-2.5 bg-purple-900 hover:bg-purple-800 text-purple-200 font-bold text-xs rounded-xl cursor-pointer border border-purple-500/30"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ĐỌC CỐT TRUYỆN GỐC CHUYÊN NGHIỆP & GIAO DIỆN CUỘN AN TOÀN */}
      {selectedStoryChar && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
          onClick={() => setSelectedStoryChar(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-gradient-to-b from-[#260844] via-[#1c0533] to-[#130225] border-2 border-purple-400/50 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.35)] flex flex-col overflow-hidden text-purple-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient decorative glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 p-5 sm:p-6 border-b border-purple-500/30 flex items-start justify-between gap-4 bg-[#1f0636]/90">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📖</span>
                  <h3 className="text-lg sm:text-2xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-pink-200 drop-shadow-sm">
                    Cốt Truyện Gốc: {selectedStoryChar.name}
                  </h3>
                </div>
                {selectedStoryChar.hashtag && (
                  <p className="text-xs text-pink-300/90 font-medium">
                    {selectedStoryChar.hashtag}
                  </p>
                )}
                {selectedStoryChar.slogan && (
                  <p className="text-xs text-purple-200/80 font-serif italic border-l-2 border-pink-400/50 pl-2">
                    "{selectedStoryChar.slogan}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selectedStoryChar.storyContent && (
                  <button
                    type="button"
                    onClick={handleCopyStory}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-semibold border border-purple-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Sao chép toàn bộ cốt truyện"
                  >
                    {copiedStory ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-300">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-pink-300" />
                        <span className="hidden sm:inline">Sao chép</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedStoryChar(null)}
                  className="p-2 rounded-xl bg-purple-950/80 hover:bg-pink-900/60 text-purple-300 hover:text-white border border-purple-500/30 transition-all cursor-pointer"
                  title="Đóng (Phím Esc)"
                >
                  <span className="text-lg font-bold leading-none px-1">✕</span>
                </button>
              </div>
            </div>

            {/* Scrollable Story Content Area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-5 sm:p-8 space-y-4 text-purple-100/95 leading-relaxed text-sm sm:text-base font-serif tracking-wide select-text">
              {selectedStoryChar.storyContent ? (
                <div className="whitespace-pre-line space-y-4">
                  {selectedStoryChar.storyContent}
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-2xl">
                    📜
                  </div>
                  <h4 className="text-base font-serif font-bold text-pink-200">
                    Cốt truyện gốc chưa được cập nhật.
                  </h4>
                  <p className="text-xs text-purple-300/70 max-w-sm mx-auto">
                    Nội dung cốt truyện của {selectedStoryChar.name} đang được biên soạn và sẽ sớm xuất hiện tại Quỳnh Hoa Story Studio!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="relative z-10 p-4 border-t border-purple-500/30 bg-[#160329]/95 flex items-center justify-between gap-3 text-xs text-purple-300">
              <span className="text-[11px] text-purple-400/80 italic">
                {selectedStoryChar.storyContent
                  ? `Dung lượng: ~${selectedStoryChar.storyContent.length.toLocaleString('vi-VN')} ký tự`
                  : 'Quỳnh Hoa Story Studio'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedStoryChar(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 hover:from-purple-600 hover:to-pink-500 text-white font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5 border border-pink-300/40"
              >
                <span>Đóng & Quay lại thẻ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CharacterLinkInput = React.memo(CharacterLinkInputBase);

