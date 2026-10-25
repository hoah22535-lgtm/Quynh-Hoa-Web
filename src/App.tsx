import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WelcomeGate } from './components/WelcomeGate';
import { HoaQuynhHeader } from './components/HoaQuynhHeader';
import { CharacterLinkInput } from './components/CharacterLinkInput';
import { StoryConsole } from './components/StoryConsole';
import { SavedStoriesModal } from './components/SavedStoriesModal';
import { DonateSection } from './components/DonateSection';
import { MinigamesSection } from './components/MinigamesSection';
import { LockedCharactersSection } from './components/LockedCharactersSection';
import CherryBlossoms from './components/CherryBlossoms';
import { ChapterStoriesSection } from './components/ChapterStoriesSection';
import { ReincarnationManager } from './components/ReincarnationManager';
import { CharacterInfo, StorySession, ChatMessage, PresetCharacter, Inventory, DonationRecord } from './types';
import { PRESET_CHARACTERS } from './data/presets';
import { Sparkles, Flower2, Heart, Moon, Info, HelpCircle, Gift, Gamepad2, BookOpen, ArrowUp, Lock, Crown, ShieldCheck, RefreshCw } from 'lucide-react';
import { initAnalyticsTrack, trackAnalyticsEvent } from './lib/analytics';

const LOCAL_STORAGE_KEY = 'quynh_hoa_saved_stories_v1';
const LOCAL_ACTIVE_CHAT_KEY = 'quynh_hoa_active_chat_session_v1';
const LOCAL_INVENTORY_KEY = 'quynh_hoa_inventory_v1';
const LOCAL_DONATIONS_KEY = 'quynh_hoa_donations_v1';
const LOCAL_TOTAL_DONATED_KEY = 'quynh_hoa_total_donated_v1';

export default function App() {
  // Navigation Tab State (1. Trang Chủ, 2. Donate Cho Quỳnh Hoa Studio, 3. Cốt Truyện Theo Chương, 4. Lệnh Chuyển Sinh, 5. Quản Trị Studio [Chỉ Chủ Sở Hữu])
  const [activeTab, setActiveTab] = useState<'story' | 'donate' | 'games' | 'reincarnation' | 'admin'>('story');

  // Owner Authentication State
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('quynh_hoa_owner_session_token_v1');
  });

  // Shared Link View-Only State
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);

  // Scroll to top button visibility state
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Auto-saved chat session restoration toast
  const [autoRestoredToast, setAutoRestoredToast] = useState<boolean>(false);
  const [isWelcomeShown, setIsWelcomeShown] = useState<boolean>(() => {
    return sessionStorage.getItem('quynh_hoa_welcome_shown') === 'true';
  });

  // Check query params for shared character & initialize analytics
  useEffect(() => {
    // 1. Initialize GA & local analytics tracking & document title
    document.title = 'Quỳnh Hoa - Đêm Tím Mộng Mơ';
    initAnalyticsTrack();

    // 2. Optimized scroll listener for "Back to top" button
    let scrollTicking = false;
    let lastScrollState = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 250;
          if (shouldShow !== lastScrollState) {
            lastScrollState = shouldShow;
            setShowScrollTop(shouldShow);
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Keyboard shortcut for owner: Ctrl+Shift+A to toggle admin page
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveTab((prev) => (prev === 'admin' ? 'story' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 4. Check URL parameters for shared access & admin mode
    try {
      const params = new URLSearchParams(window.location.search);
      const isShared = params.has('share') || params.get('mode') === 'view' || params.get('studio') === 'quynh_hoa';
      if (isShared) {
        setIsViewOnly(true);
      }

      // Check if admin mode was requested via URL: ?admin=true, ?owner=true, #admin, #quan-tri
      const isAdminRequested =
        params.has('admin') ||
        params.get('admin') === 'true' ||
        params.has('owner') ||
        window.location.hash === '#admin' ||
        window.location.hash === '#quan-tri';

      if (isAdminRequested) {
        setActiveTab('admin');
      }

      const paramChar = params.get('char');
      const paramLink = params.get('link');
      const paramDokichat = params.get('dokichat');
      const paramGgai = params.get('ggai');
      const paramImely = params.get('imely');
      const paramDesc = params.get('desc');

      if (paramChar) {
        setCharacter(prev => ({
          ...prev,
          name: paramChar,
          avatar: '',
          link: paramLink || paramDokichat || prev.link,
          linkDokichat: paramDokichat || paramLink || prev.linkDokichat,
          linkGgai: paramGgai || prev.linkGgai,
          linkImely: paramImely || prev.linkImely,
          intro: paramDesc || prev.intro,
          description: paramDesc || prev.description,
        }));
      }
    } catch (e) {
      console.error('URL params parse error:', e);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Inventory State (Flowers, Stars, Diamonds)
  const [inventory, setInventory] = useState<Inventory>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_INVENTORY_KEY);
      return saved ? JSON.parse(saved) : { flowers: 0, stars: 0, diamonds: 0 };
    } catch {
      return { flowers: 0, stars: 0, diamonds: 0 };
    }
  });

  // Total Donated to Quỳnh Hoa Studio State
  const [totalDonated, setTotalDonated] = useState<Inventory>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_TOTAL_DONATED_KEY);
      return saved ? JSON.parse(saved) : { flowers: 0, stars: 0, diamonds: 0 };
    } catch {
      return { flowers: 0, stars: 0, diamonds: 0 };
    }
  });

  // Donation Records Log
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_DONATIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Inventory & Donations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_INVENTORY_KEY, JSON.stringify(inventory));
      localStorage.setItem(LOCAL_TOTAL_DONATED_KEY, JSON.stringify(totalDonated));
      localStorage.setItem(LOCAL_DONATIONS_KEY, JSON.stringify(donationRecords));
    } catch (e) {
      console.error(e);
    }
  }, [inventory, totalDonated, donationRecords]);

  // Handle Reward from Minigames
  const handleRewardFromGame = (f: number, s: number, d: number) => {
    setInventory((prev) => ({
      flowers: prev.flowers + f,
      stars: prev.stars + s,
      diamonds: prev.diamonds + d,
    }));
  };

  // Handle Donate Submit
  const handleDonateToStudio = (f: number, s: number, d: number, msg: string, name: string) => {
    // Deduct from user inventory
    setInventory((prev) => ({
      flowers: Math.max(0, prev.flowers - f),
      stars: Math.max(0, prev.stars - s),
      diamonds: Math.max(0, prev.diamonds - d),
    }));

    // Add to total donated
    setTotalDonated((prev) => ({
      flowers: prev.flowers + f,
      stars: prev.stars + s,
      diamonds: prev.diamonds + d,
    }));

    // Add record
    const newRecord: DonationRecord = {
      id: Date.now().toString(),
      donorName: name.trim() || 'Bạn đọc giấu tên',
      flowers: f,
      stars: s,
      diamonds: d,
      message: msg.trim(),
      timestamp: 'Vừa xong',
    };

    setDonationRecords((prev) => [newRecord, ...prev]);
  };

  // 1. State: Character Info
  const [character, setCharacter] = useState<CharacterInfo>(() => {
    try {
      const publishedChar = localStorage.getItem('quynh_hoa_homepage_char');
      if (publishedChar) {
        const parsed = JSON.parse(publishedChar);
        if (parsed && parsed.name && parsed.name !== 'Lạc Vân Hi') {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return {
      id: PRESET_CHARACTERS[0].id || 'chinh-duong',
      name: PRESET_CHARACTERS[0].name,
      avatar: PRESET_CHARACTERS[0].avatar,
      intro: PRESET_CHARACTERS[0].description,
      description: PRESET_CHARACTERS[0].description,
      personality: PRESET_CHARACTERS[0].personality,
      link: PRESET_CHARACTERS[0].sampleLink,
      sourceType: 'custom_preset',
    };
  });

  // 2. State: Selected Genre
  const [selectedGenre, setSelectedGenre] = useState<string>('Ngôn Tình Đô Thị');

  // 3. State: User Message
  const [userMessage, setUserMessage] = useState<string>(
    'Đêm nay mưa phùn lất phất dưới hiên nhà, hoa quỳnh trắng nở thơm dịu nhẹ. Em đứng chờ anh mang theo chiếc ô màu kem...'
  );

  // 4. State: Active Story Session (Auto-restored from LocalStorage to prevent data loss on reload)
  const [activeSession, setActiveSession] = useState<StorySession | null>(() => {
    try {
      const savedActive = localStorage.getItem(LOCAL_ACTIVE_CHAT_KEY);
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        if (parsed && parsed.messages && parsed.messages.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading active chat session from localStorage:', e);
    }
    return null;
  });

  // Auto-save active chat session to localStorage whenever messages or session update
  useEffect(() => {
    try {
      if (activeSession && activeSession.messages && activeSession.messages.length > 0) {
        localStorage.setItem(LOCAL_ACTIVE_CHAT_KEY, JSON.stringify(activeSession));
      } else {
        localStorage.removeItem(LOCAL_ACTIVE_CHAT_KEY);
      }
    } catch (e) {
      console.error('Failed to auto-save active chat session:', e);
    }
  }, [activeSession]);

  // 5. State: Saved Sessions in LocalStorage
  const [savedSessions, setSavedSessions] = useState<StorySession[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. UI States
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Persist saved sessions
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedSessions));
    } catch (e) {
      console.error('Failed to save stories to localStorage:', e);
    }
  }, [savedSessions]);

  // Handle Preset Select
  const handleSelectPreset = useCallback((preset: PresetCharacter) => {
    setCharacter({
      name: preset.name,
      avatar: preset.avatar,
      description: preset.description,
      personality: preset.personality,
      link: preset.sampleLink,
      sourceType: 'custom_preset',
    });
    if (preset.genre) {
      setSelectedGenre(preset.genre);
    }
    if (preset.greeting) {
      setUserMessage(`"${preset.greeting}"`);
    }
  }, []);

  // Handle Analyze Link from Server
  const handleAnalyzeLink = useCallback(async (url: string) => {
    if (!url || !url.startsWith('http')) return;
    setIsLoadingAnalysis(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.success && data.characterData) {
        const d = data.characterData;
        setCharacter(prev => ({
          ...prev,
          name: d.name || prev.name,
          personality: d.personality || prev.personality,
          description: d.description || prev.description,
          avatar: d.avatar && d.avatar.startsWith('http') ? d.avatar : prev.avatar,
        }));
        if (d.suggestedGenre) {
          setSelectedGenre(d.suggestedGenre);
        }
      }
    } catch (err) {
      console.error('Error analyzing link:', err);
    } finally {
      setIsLoadingAnalysis(false);
    }
  }, []);

  // Handle direct entry to chat for a chosen character
  const handleStartDirectChat = useCallback((selectedChar?: CharacterInfo | PresetCharacter, targetLink?: string) => {
    let targetChar: CharacterInfo = selectedChar
      ? ('greeting' in selectedChar
          ? {
              name: selectedChar.name,
              avatar: '',
              intro: selectedChar.description,
              link: selectedChar.sampleLink,
              sourceType: 'custom_preset',
              description: selectedChar.description,
              personality: selectedChar.personality,
            }
          : selectedChar)
      : character;

    if (targetLink) {
      targetChar = {
        ...targetChar,
        link: targetLink,
      };
    }

    const greeting = (selectedChar && 'greeting' in selectedChar && selectedChar.greeting)
      ? selectedChar.greeting
      : `Xin chào! Tôi là ${targetChar.name || 'Nhân vật Quỳnh Hoa'}. Rất vui được gặp bạn đêm nay tại Quỳnh Hoa Studio!`;

    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    const instantSession: StorySession = {
      id: `story-direct-${Date.now()}`,
      character: targetChar,
      genre: 'Cốt Truyện Quỳnh Hoa',
      userPrompt: 'Gặp gỡ và trò chuyện trực tiếp tại Quỳnh Hoa Studio',
      title: `Cốt Truyện Trực Tiếp với ${targetChar.name}`,
      summary: greeting.slice(0, 100),
      messages: [
        {
          id: `msg-narrator-${Date.now()}`,
          sender: 'narrator',
          content: `Màn đêm buông xuống trên mái hiên Quỳnh Hoa Studio, những cánh hoa quỳnh trắng e ấp nở. ${targetChar.name} đang chờ bạn...`,
          timestamp: nowStr,
        },
        {
          id: `msg-char-${Date.now()}`,
          sender: 'character',
          content: greeting,
          timestamp: nowStr,
          emotion: 'Dịu dàng & Thâm tình',
          actionChoices: [
            'Chào bạn! Rất vui được trò chuyện trực tiếp cùng bạn.',
            'Kể cho mình nghe bối cảnh câu chuyện của bạn nhé!',
            'Đêm nay Quỳnh Hoa Studio có gì đặc biệt không?'
          ]
        }
      ],
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    };

    setCharacter(targetChar);
    setActiveSession(instantSession);
    setActiveTab('story');

    setTimeout(() => {
      const consoleEl = document.getElementById('story-console-container');
      if (consoleEl) {
        consoleEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [character]);

  // Handle Save Current Game Mode / Session Configuration
  const handleSaveCurrentMode = useCallback(() => {
    const savedMode = {
      character,
      selectedGenre,
      userMessage,
      activeSession,
      savedAt: new Date().toLocaleString('vi-VN'),
    };
    localStorage.setItem('quynh_hoa_current_game_mode', JSON.stringify(savedMode));

    if (activeSession) {
      handleSaveStory(activeSession);
    }

  }, [character, selectedGenre, userMessage, activeSession]);

  // Handle Start Story Generation (First Turn)
  const handleStartStory = async () => {
    if (!userMessage.trim()) {
      setErrorMessage('Vui lòng nhập lời nhắn của bạn trước khi khởi tạo cốt truyện.');
      return;
    }

    setErrorMessage(null);
    setIsLoadingStory(true);

    try {
      const response = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character,
          genre: selectedGenre,
          userMessage: userMessage.trim(),
          chatHistory: [],
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Khởi tạo cốt truyện thất bại');
      }

      const resData = json.data;
      const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

      const initialMessages: ChatMessage[] = [];

      // Add Narrator Scene if present
      if (resData.narratorScene) {
        initialMessages.push({
          id: `msg-narrator-${Date.now()}`,
          sender: 'narrator',
          content: resData.narratorScene,
          timestamp: nowStr,
        });
      }

      // Add User opening message
      initialMessages.push({
        id: `msg-user-1-${Date.now()}`,
        sender: 'user',
        content: userMessage.trim(),
        timestamp: nowStr,
      });

      // Add Character Response
      initialMessages.push({
        id: `msg-char-1-${Date.now()}`,
        sender: 'character',
        content: resData.characterResponse,
        timestamp: nowStr,
        emotion: resData.characterEmotion,
        actionChoices: resData.suggestedChoices || [],
      });

      const newSession: StorySession = {
        id: `story-${Date.now()}`,
        character,
        genre: selectedGenre,
        userPrompt: userMessage.trim(),
        title: resData.title || `Cốt Truyện với ${character.name}`,
        summary: resData.characterResponse.slice(0, 100),
        messages: initialMessages,
        createdAt: new Date().toLocaleDateString('vi-VN'),
        updatedAt: new Date().toLocaleDateString('vi-VN'),
      };

      setActiveSession(newSession);

      // Smooth scroll to console
      setTimeout(() => {
        const consoleEl = document.getElementById('story-console-container');
        if (consoleEl) {
          consoleEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      console.error('Failed to generate story:', err);
      setErrorMessage(err.message || 'Có lỗi xảy ra khi gọi AI. Vui lòng thử lại!');
    } finally {
      setIsLoadingStory(false);
    }
  };

  // Handle Send Next Reply in Active Session
  const handleSendMessage = async (replyText: string) => {
    if (!activeSession || isLoadingStory) return;

    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    // Track Analytics Event for Message Sending
    trackAnalyticsEvent('send_chat_message', {
      character: activeSession.character.name,
      length: replyText.length,
    });

    // Append user message immediately to state
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      content: replyText,
      timestamp: nowStr,
    };

    const updatedMessages = [...activeSession.messages, userMsg];

    setActiveSession({
      ...activeSession,
      messages: updatedMessages,
    });

    setIsLoadingStory(true);

    try {
      const response = await fetch('/api/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: activeSession.character,
          genre: activeSession.genre,
          userMessage: replyText,
          chatHistory: updatedMessages.map(m => ({
            sender: m.sender === 'user' ? 'User' : m.sender === 'character' ? activeSession.character.name : 'Narrator',
            content: m.content,
          })),
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Không thể tạo phản hồi tiếp theo');
      }

      const resData = json.data;

      const charMsg: ChatMessage = {
        id: `msg-char-${Date.now()}`,
        sender: 'character',
        content: resData.characterResponse,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        emotion: resData.characterEmotion,
        actionChoices: resData.suggestedChoices || [],
      };

      setActiveSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, charMsg],
        updatedAt: new Date().toLocaleDateString('vi-VN'),
      } : null);

    } catch (err: any) {
      console.error('Failed to send message:', err);
      setErrorMessage(err.message || 'Lỗi khi kết nối nhân vật');
    } finally {
      setIsLoadingStory(false);
    }
  };

  // Handle Save Session
  const handleSaveStory = (sessionToSave: StorySession) => {
    setSavedSessions(prev => {
      const exists = prev.some(s => s.id === sessionToSave.id);
      if (exists) {
        return prev.map(s => s.id === sessionToSave.id ? sessionToSave : s);
      }
      return [sessionToSave, ...prev];
    });
  };

  // Check if current active session is saved
  const isCurrentSaved = activeSession
    ? savedSessions.some(s => s.id === activeSession.id)
    : false;

  const handleDeleteSaved = (id: string) => {
    setSavedSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleClearAllSaved = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả cốt truyện đã lưu?')) {
      setSavedSessions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c0630] via-[#130322] to-[#0c0117] text-purple-100 font-sans flex flex-col relative selection:bg-purple-600 selection:text-white">
      
      {!isWelcomeShown && <WelcomeGate onEnter={() => { setIsWelcomeShown(true); sessionStorage.setItem('quynh_hoa_welcome_shown', 'true'); }} />}
      <CherryBlossoms />

      {/* Top Banner with White Flower Art */}
      <HoaQuynhHeader
        onOpenSavedStories={() => setShowSavedModal(true)}
        savedCount={savedSessions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#1f0736]/90 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-lg">
          {/* 1. Trang Chủ */}
          <button
            type="button"
            onClick={() => setActiveTab('story')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'story'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md border border-purple-300/40'
                : 'text-purple-200 hover:text-white hover:bg-purple-900/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-200" />
            <span>Trang Chủ</span>
          </button>

          {/* 2. Donate Cho Quỳnh Hoa Studio */}
          <button
            type="button"
            onClick={() => setActiveTab('donate')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'donate'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md border border-pink-300/40'
                : 'text-purple-200 hover:text-white hover:bg-purple-900/50'
            }`}
          >
            <Gift className="w-4 h-4 text-pink-300" />
            <span>Donate Cho Quỳnh Hoa Studio</span>
          </button>

          {/* 3. Cốt Truyện Theo Chương */}
          <button
            type="button"
            onClick={() => setActiveTab('games')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'games'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md border border-indigo-300/40'
                : 'text-purple-200 hover:text-white hover:bg-purple-900/50'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span>Cốt Truyện Theo Chương</span>
          </button>

          {/* 4. Lệnh Chuyển Sinh */}
          <button
            type="button"
            onClick={() => setActiveTab('reincarnation')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'reincarnation'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md border border-teal-300/40'
                : 'text-purple-200 hover:text-white hover:bg-purple-900/50'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-emerald-300" />
            <span>🔄 Lệnh chuyển sinh</span>
          </button>

          {/* 5. Tab Quản Trị Studio (Chỉ hiển thị khi đang ở chế độ admin hoặc chủ sở hữu đã xác thực) */}
          {(activeTab === 'admin' || isOwnerLoggedIn) && (
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 border ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)] border-amber-300/50'
                  : 'border-amber-500/30 bg-purple-950/70 text-amber-200 hover:text-white hover:bg-purple-900/70'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Quản Trị Studio</span>
            </button>
          )}
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-purple-950/90 border border-purple-400/50 text-pink-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-md animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-pink-300 hover:text-white font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* TAB 1: STORY ROLEPLAY */}
        {activeTab === 'story' && (
          <>
            {!activeSession ? (
              <div className="space-y-6">
                {/* Input 1: Character Link */}
                <CharacterLinkInput
                  character={character}
                  onChange={setCharacter}
                  onSelectPreset={handleSelectPreset}
                  isLoadingAnalysis={isLoadingAnalysis}
                  onAnalyzeLink={handleAnalyzeLink}
                  onStartDirectChat={handleStartDirectChat}
                  onSaveCurrentMode={handleSaveCurrentMode}
                  isViewOnly={isViewOnly}
                  userEmail="hoah22535@gmail.com"
                />
              </div>
            ) : (
              /* Active Interactive Story Console */
              <div className="space-y-6">
                <StoryConsole
                  session={activeSession}
                  onSendMessage={handleSendMessage}
                  onSaveStory={handleSaveStory}
                  onReset={() => setActiveSession(null)}
                  isGeneratingMessage={isLoadingStory}
                  isSaved={isCurrentSaved}
                />

                {/* Option to return to editor and tweak */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSession(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-900/80 backdrop-blur-md border border-purple-400/40 text-purple-100 hover:text-white hover:bg-purple-800 text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <span>← Quay lại bảng tùy chỉnh nhân vật & bối cảnh</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 4: CHẾ ĐỘ CHỦ SỞ HỮU QUẢN LÝ NHÂN VẬT (ADMIN) */}
        {activeTab === 'admin' && (
          <LockedCharactersSection
            onBackToHome={() => setActiveTab('story')}
            onCharacterPublished={() => {
              // Trigger reload or update
            }}
          />
        )}

        {/* TAB 2: DONATE CHO QUỲNH HOA STUDIO */}
        {activeTab === 'donate' && (
          <DonateSection
            inventory={inventory}
            onDonate={handleDonateToStudio}
            totalDonated={totalDonated}
            donationRecords={donationRecords}
          />
        )}

        {/* TAB 4: LỆNH CHUYỂN SINH */}
        {activeTab === 'reincarnation' && (
          <ReincarnationManager onBackToHome={() => setActiveTab('story')} />
        )}

        {/* TAB 3: CỐT TRUYỆN THEO CHƯƠNG */}
        {activeTab === 'games' && (
          <ChapterStoriesSection />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 px-4 bg-[#17042a]/90 backdrop-blur-md border-t border-purple-500/30 text-center text-xs text-purple-300 space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-pink-300 font-bold">
          <Flower2 className="w-4 h-4 text-white drop-shadow-sm" />
          <span>Quỳnh Hoa Studio</span>
          <span className="text-purple-500">•</span>
          <span className="text-purple-200 font-medium">Hệ Thống Ngủ Ngày Thức Đêm</span>
        </div>
        <p className="text-[11px] text-purple-300/70">
          Trang web thiết kế cốt truyện nhập vai & bình luận lưu bút Quỳnh Hoa Studio.
        </p>
        <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-purple-400/40">
          <span>Quỳnh Hoa Studio © 2026</span>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'admin' ? 'story' : 'admin')}
            className="hover:text-pink-300 transition-colors cursor-pointer flex items-center gap-1"
            title="Khu vực dành cho chủ sở hữu Studio"
          >
            <Crown className="w-3 h-3 text-amber-400/50" />
            <span>Khu vực chủ sở hữu</span>
          </button>
        </div>
      </footer>

      {/* Floating Flower 'Back To Top' Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white shadow-[0_0_20px_rgba(219,39,119,0.6)] border-2 border-pink-300/80 hover:scale-110 active:scale-95 transition-all cursor-pointer group animate-in fade-in zoom-in duration-200"
          title="Nút Lên Đầu Trang - Quỳnh Hoa Studio"
        >
          <div className="relative flex items-center justify-center">
            <Flower2 className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            <ArrowUp className="w-3 h-3 text-amber-200 absolute -top-1 -right-1 font-extrabold drop-shadow" />
          </div>

          {/* Tooltip on Hover */}
          <span className="absolute -top-9 right-0 bg-purple-950/95 text-pink-200 text-[11px] font-bold px-2.5 py-1 rounded-xl border border-pink-400/50 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
            <span>🌸 Lên đầu trang</span>
          </span>
        </button>
      )}

      {/* Saved Stories Modal Drawer */}
      <SavedStoriesModal
        isOpen={showSavedModal}
        onClose={() => setShowSavedModal(false)}
        savedSessions={savedSessions}
        onLoadSession={(s) => setActiveSession(s)}
        onDeleteSession={handleDeleteSaved}
        onClearAll={handleClearAllSaved}
      />

    </div>
  );
}
