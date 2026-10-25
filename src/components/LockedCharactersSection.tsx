import React, { useState, useEffect } from 'react';
import {
  Crown,
  Lock,
  Unlock,
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Globe,
  Check,
  LogOut,
  FileText,
  Flower2,
  ExternalLink,
  ArrowLeft,
  KeyRound,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Tag,
  Quote,
  Eye,
  EyeOff
} from 'lucide-react';
import { CharacterInfo } from '../types';

const AUTHORIZED_OWNER_EMAIL = 'hoah22535@gmail.com';
const LOCAL_SESSION_TOKEN_KEY = 'quynh_hoa_owner_session_token_v1';

interface LockedCharactersSectionProps {
  onCharacterPublished?: () => void;
  onBackToHome?: () => void;
}

export const LockedCharactersSection: React.FC<LockedCharactersSectionProps> = ({
  onCharacterPublished,
  onBackToHome,
}) => {
  // Session & Authentication State
  const [sessionToken, setSessionToken] = useState<string>(() => {
    return localStorage.getItem(LOCAL_SESSION_TOKEN_KEY) || localStorage.getItem('quynh_hoa_nph_token') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Login Form States
  const [ownerPasswordInput, setOwnerPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);

  // Active Admin View Tab: 'homepage_chars' (Nhân vật trang chủ) | 'locked_archive' (Kho khóa & nháp)
  const [adminViewTab, setAdminViewTab] = useState<'homepage_chars' | 'locked_archive'>('homepage_chars');

  // Homepage Characters State
  const [publicList, setPublicList] = useState<CharacterInfo[]>([]);
  const [isLoadingPublicList, setIsLoadingPublicList] = useState<boolean>(false);

  // Locked/Draft Characters State
  const [lockedList, setLockedList] = useState<CharacterInfo[]>([]);
  const [isLoadingLockedList, setIsLoadingLockedList] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'locked' | 'draft' | 'published'>('all');

  // Character Editor Modal State
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [editingChar, setEditingChar] = useState<CharacterInfo | null>(null);
  const [isEditingPublicChar, setIsEditingPublicChar] = useState<boolean>(false);
  const [isSubmittingChar, setIsSubmittingChar] = useState<boolean>(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    status: 'published' as 'published' | 'locked' | 'draft',
    hashtag: '',
    slogan: '',
    intro: '',
    description: '',
    storyContent: '',
    linkDokichat: '',
    linkGgai: '',
    linkImely: '',
  });

  // Verify Session with Server on Mount & Token Change
  const verifySessionWithServer = async (tokenToCheck: string) => {
    if (!tokenToCheck) {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/session', {
        headers: {
          Authorization: `Bearer ${tokenToCheck}`,
        },
      });
      const data = await res.json();
      if (data && data.isAuthenticated) {
        setIsAuthenticated(true);
        fetchAllCharacters(tokenToCheck);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    verifySessionWithServer(sessionToken);
  }, [sessionToken]);

  // Fetch both Public and Locked Characters
  const fetchAllCharacters = async (token: string) => {
    fetchPublicCharacters();
    fetchLockedCharacters(token);
  };

  const fetchPublicCharacters = async () => {
    setIsLoadingPublicList(true);
    try {
      const res = await fetch('/api/characters');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.characters)) {
        setPublicList(data.characters);
      }
    } catch (e) {
      console.error('Error fetching public characters:', e);
    } finally {
      setIsLoadingPublicList(false);
    }
  };

  const fetchLockedCharacters = async (token: string) => {
    setIsLoadingLockedList(true);
    try {
      const res = await fetch('/api/locked-characters', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        setIsAuthenticated(false);
        setLockedList([]);
        return;
      }

      const data = await res.json();
      if (data && data.success && Array.isArray(data.characters)) {
        setLockedList(data.characters);
      }
    } catch (err) {
      console.error('Error fetching locked characters:', err);
    } finally {
      setIsLoadingLockedList(false);
    }
  };

  // Google Sign-In with GIS
  const handleGoogleSignIn = () => {
    if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
      const google = (window as any).google;
      try {
        google.id.initialize({
          client_id: '117415526578899640039-example.apps.googleusercontent.com',
          callback: async (response: any) => {
            if (response.credential) {
              await verifyGoogleCredentialOnServer(response.credential);
            }
          },
        });
        google.id.prompt();
      } catch (e) {
        setAuthError('Không thể mở Google Sign-In. Vui lòng sử dụng phương thức đăng nhập bằng mật khẩu chủ sở hữu bên dưới.');
      }
    } else {
      setAuthError('Dịch vụ Google Sign-In chưa tải xong. Vui lòng nhập mật khẩu chủ sở hữu bên dưới.');
    }
  };

  const verifyGoogleCredentialOnServer = async (credential: string) => {
    setIsSubmittingLogin(true);
    setAuthError(null);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem(LOCAL_SESSION_TOKEN_KEY, data.token);
        localStorage.setItem('quynh_hoa_nph_token', data.token);
        setSessionToken(data.token);
        setIsAuthenticated(true);
        fetchAllCharacters(data.token);
      } else {
        setAuthError(data.error || 'Bạn không có quyền truy cập. Chỉ tài khoản hoah22535@gmail.com mới được phép quản trị.');
      }
    } catch (err: any) {
      setAuthError('Lỗi xác thực: ' + err.message);
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // Direct Owner Passkey / Password Authentication
  const handleDirectOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerPasswordInput.trim()) {
      setAuthError('Vui lòng nhập mật khẩu xác thực chủ sở hữu!');
      return;
    }

    setIsSubmittingLogin(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/owner-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: AUTHORIZED_OWNER_EMAIL,
          password: ownerPasswordInput.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem(LOCAL_SESSION_TOKEN_KEY, data.token);
        localStorage.setItem('quynh_hoa_nph_token', data.token);
        setSessionToken(data.token);
        setIsAuthenticated(true);
        setOwnerPasswordInput('');
        fetchAllCharacters(data.token);
      } else {
        setAuthError(data.error || 'Bạn không có quyền truy cập.');
      }
    } catch (err: any) {
      setAuthError('Lỗi kết nối máy chủ: ' + err.message);
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
    } catch (e) {}
    localStorage.removeItem(LOCAL_SESSION_TOKEN_KEY);
    localStorage.removeItem('quynh_hoa_nph_token');
    setSessionToken('');
    setIsAuthenticated(false);
    setPublicList([]);
    setLockedList([]);
  };

  // Open Form to Create New Character
  const handleOpenCreateModal = (defaultStatus: 'published' | 'locked' | 'draft' = 'published') => {
    setEditingChar(null);
    setIsEditingPublicChar(defaultStatus === 'published');
    setFormData({
      name: '',
      status: defaultStatus,
      hashtag: '',
      slogan: '',
      intro: '',
      description: '',
      storyContent: '',
      linkDokichat: '',
      linkGgai: '',
      linkImely: '',
    });
    setShowEditorModal(true);
  };

  // Open Form to Edit Character
  const handleOpenEditModal = (char: CharacterInfo, isPublic: boolean) => {
    setEditingChar(char);
    setIsEditingPublicChar(isPublic);
    setFormData({
      name: char.name || '',
      status: isPublic ? 'published' : ((char.status as 'locked' | 'draft') || 'locked'),
      hashtag: char.hashtag || '',
      slogan: char.slogan || '',
      intro: char.intro || char.description || '',
      description: char.description || char.intro || '',
      storyContent: char.storyContent || char.intro || '',
      linkDokichat: char.linkDokichat || '',
      linkGgai: char.linkGgai || '',
      linkImely: char.linkImely || '',
    });
    setShowEditorModal(true);
  };

  // Save Character (Create or Update)
  const handleSaveCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên nhân vật!');
      return;
    }

    setIsSubmittingChar(true);
    try {
      const payload = {
        name: formData.name.trim(),
        status: formData.status,
        hashtag: formData.hashtag.trim(),
        slogan: formData.slogan.trim(),
        intro: formData.intro.trim(),
        description: formData.description.trim() || formData.intro.trim(),
        storyContent: formData.storyContent.trim() || formData.intro.trim(),
        linkDokichat: formData.linkDokichat.trim(),
        linkGgai: formData.linkGgai.trim(),
        linkImely: formData.linkImely.trim(),
        link: formData.linkDokichat.trim() || formData.linkGgai.trim() || formData.linkImely.trim(),
      };

      if (formData.status === 'published') {
        // Save to public characters
        if (editingChar && editingChar.id && isEditingPublicChar) {
          // Update public character
          const res = await fetch(`/api/characters/${editingChar.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Lỗi cập nhật nhân vật');
        } else {
          // Add new public character
          const res = await fetch('/api/characters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Lỗi thêm nhân vật');
        }
      } else {
        // Save to locked/draft repository
        if (editingChar && editingChar.id && !isEditingPublicChar) {
          const res = await fetch(`/api/locked-characters/${editingChar.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Lỗi cập nhật nhân vật khóa');
        } else {
          const res = await fetch('/api/locked-characters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Lỗi thêm nhân vật khóa');
        }
      }

      // Refresh both lists
      fetchAllCharacters(sessionToken);
      if (onCharacterPublished) onCharacterPublished();

      setShowEditorModal(false);
      alert('🎉 Lưu thông tin nhân vật thành công!');
    } catch (err: any) {
      alert('Lỗi lưu nhân vật: ' + err.message);
    } finally {
      setIsSubmittingChar(false);
    }
  };

  // Delete Character
  const handleDeleteCharacter = async (id: string, name: string, isPublic: boolean) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn nhân vật "${name}"?`)) {
      return;
    }

    try {
      const endpoint = isPublic ? `/api/characters/${id}` : `/api/locked-characters/${id}`;
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Bạn không có quyền truy cập.');
        return;
      }

      fetchAllCharacters(sessionToken);
      if (onCharacterPublished) onCharacterPublished();
      alert(`🗑️ Đã xóa nhân vật "${name}" thành công!`);
    } catch (err: any) {
      alert('Lỗi xóa: ' + err.message);
    }
  };

  // Publish Character from Locked Archive to Homepage
  const handlePublishToHomepage = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn công khai nhân vật "${name}" lên Trang Chủ Quỳnh Hoa Studio?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/locked-characters/${id}/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Bạn không có quyền truy cập.');
        return;
      }

      alert(`🌟 ${data.message || 'Đã công khai nhân vật thành công lên Trang Chủ!'}`);
      fetchAllCharacters(sessionToken);
      if (onCharacterPublished) onCharacterPublished();
    } catch (err: any) {
      alert('Lỗi công khai: ' + err.message);
    }
  };

  // Filtered Locked List
  const filteredLockedChars = lockedList.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'locked') return item.status === 'locked' || (!item.status && item.isLocked);
    if (activeFilter === 'draft') return item.status === 'draft';
    if (activeFilter === 'published') return item.status === 'published';
    return true;
  });

  // ==========================================
  // VIEW 1: OWNER NOT AUTHENTICATED
  // ==========================================
  if (!isAuthenticated && !isCheckingAuth) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto">
        <div className="bg-[#1b052d]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-pink-500/40 shadow-[0_0_40px_rgba(236,72,153,0.25)] text-center relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Crown Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600/30 via-purple-700/30 to-indigo-800/40 border-2 border-pink-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.3)] mb-4">
            <Crown className="w-8 h-8 text-amber-300" />
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-300 tracking-wide mb-2">
            Cổng Quản Trị Chủ Sở Hữu Studio
          </h2>

          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-sans mb-4">
            Khu vực quản lý, đăng tải và chỉnh sửa toàn bộ nhân vật tại Quỳnh Hoa Story Studio.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-950/90 border border-purple-400/40 text-xs text-pink-300 font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Chỉ cấp quyền cho hoah22535@gmail.com</span>
          </div>

          {authError && (
            <div className="p-3 mb-5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Sign In Options */}
          <div className="space-y-4 text-left">
            {/* Option A: Google Sign-In */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmittingLogin}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-3 border border-neutral-300 disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Đăng nhập với Google (hoah22535@gmail.com)</span>
              </button>
            </div>

            <div className="flex items-center my-2">
              <div className="flex-1 border-t border-purple-500/30" />
              <span className="px-3 text-[11px] text-purple-300/70 uppercase">hoặc</span>
              <div className="flex-1 border-t border-purple-500/30" />
            </div>

            {/* Option B: Direct Passkey Form */}
            <form onSubmit={handleDirectOwnerLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  Email Chủ Sở Hữu
                </label>
                <input
                  type="email"
                  disabled
                  value={AUTHORIZED_OWNER_EMAIL}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#120224]/80 border border-purple-500/30 text-amber-300 font-mono text-xs opacity-90 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1">
                  Mật Khẩu / Passkey Xác Thực Chủ Sở Hữu *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={ownerPasswordInput}
                    onChange={(e) => setOwnerPasswordInput(e.target.value)}
                    placeholder="Nhập mật khẩu chủ sở hữu..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120224] border border-pink-400/50 text-white font-mono text-xs focus:outline-none focus:border-pink-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingLogin}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 border border-pink-300/50 disabled:opacity-50"
              >
                {isSubmittingLogin ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-pink-200" />
                    <span>Đang xác thực...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-amber-200" />
                    <span>Xác Thực Mở Khóa Quản Trị</span>
                  </>
                )}
              </button>
            </form>

            {onBackToHome && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="text-xs text-purple-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại xem Trang Chủ Quỳnh Hoa</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED OWNER ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: Authenticated Owner Profile */}
      <div className="bg-gradient-to-r from-[#2c084d] via-[#1f0538] to-[#280747] rounded-3xl p-5 sm:p-6 border-2 border-pink-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-pink-600 text-white flex items-center justify-center font-bold shadow-lg border border-amber-300/40 shrink-0">
            <Crown className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-black text-white flex items-center gap-2">
                <span>Trang Quản Trị Chủ Sở Hữu Studio</span>
              </h2>
              <span className="text-[11px] text-emerald-200 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/40 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Lê Ngọc Quỳnh ({AUTHORIZED_OWNER_EMAIL})</span>
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-1 font-serif italic">
              Toàn quyền Thêm, Sửa, Xóa nhân vật trên Trang Chủ và Quản lý Kho Lưu Trữ Bản Nháp.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="px-3.5 py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white font-semibold text-xs border border-purple-400/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span>Xem Trang Chủ</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleOpenCreateModal(adminViewTab === 'homepage_chars' ? 'published' : 'locked')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5 border border-amber-300/40"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            <span>Thêm Char Mới +</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-2.5 rounded-xl bg-purple-950/90 hover:bg-red-950 text-purple-300 hover:text-red-200 font-semibold text-xs border border-purple-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            title="Đăng xuất quyền chủ sở hữu"
          >
            <LogOut className="w-3.5 h-3.5 text-pink-300" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Tabs: 1. Nhân vật Trang Chủ | 2. Kho Bản Nháp & Đang Khóa */}
      <div className="flex items-center gap-2 p-1.5 bg-[#1f0736]/90 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-lg">
        <button
          type="button"
          onClick={() => setAdminViewTab('homepage_chars')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
            adminViewTab === 'homepage_chars'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md border border-purple-300/40'
              : 'text-purple-200 hover:text-white hover:bg-purple-900/50'
          }`}
        >
          <Globe className="w-4 h-4 text-amber-200" />
          <span>Nhân Vật Đang Lên Trang Chủ ({publicList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminViewTab('locked_archive')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
            adminViewTab === 'locked_archive'
              ? 'bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-md border border-pink-300/40'
              : 'text-purple-200 hover:text-white hover:bg-purple-900/50'
          }`}
        >
          <Lock className="w-4 h-4 text-pink-300" />
          <span>Kho Nhân Vật Khóa & Bản Nháp ({lockedList.length})</span>
        </button>
      </div>

      {/* TAB 1: HOMEPAGE CHARACTERS */}
      {adminViewTab === 'homepage_chars' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Danh Sách Nhân Vật Đang Hiển Thị Công Khai Cho Độc Giả:</span>
            </h3>
            <button
              type="button"
              onClick={() => handleOpenCreateModal('published')}
              className="text-xs text-pink-300 hover:text-white font-semibold underline cursor-pointer"
            >
              + Thêm nhân vật mới lên trang chủ
            </button>
          </div>

          {isLoadingPublicList ? (
            <div className="py-12 text-center text-purple-300 space-y-2">
              <div className="w-8 h-8 mx-auto border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Đang tải danh sách nhân vật trang chủ...</p>
            </div>
          ) : publicList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#1a042e]/80 border border-purple-500/30 text-center space-y-2">
              <Flower2 className="w-8 h-8 text-pink-400 mx-auto" />
              <p className="text-xs text-purple-300">Chưa có nhân vật nào trên trang chủ.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#220738]/90 border border-purple-500/40 hover:border-pink-400/60 shadow-lg transition-all space-y-3 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-700 text-white flex items-center justify-center font-bold shrink-0">
                        <Flower2 className="w-5 h-5 text-pink-200" />
                      </div>
                      <div>
                        <h4 className="text-base font-serif font-bold text-white">{item.name}</h4>
                        <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40">
                          ✓ Đang hiển thị trang chủ
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(item, true)}
                        className="px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-amber-300 hover:text-white text-xs font-semibold border border-purple-400/30 transition-all cursor-pointer flex items-center gap-1"
                        title="Chỉnh sửa thông tin nhân vật"
                      >
                        <Edit3 className="w-3 h-3 text-amber-300" />
                        <span>Sửa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCharacter(item.id || '', item.name, true)}
                        className="px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-200 text-xs font-semibold border border-red-500/30 transition-all cursor-pointer flex items-center gap-1"
                        title="Xóa nhân vật khỏi trang chủ"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>

                  {item.slogan && (
                    <p className="text-xs text-pink-200/90 font-serif italic border-l-2 border-pink-400/50 pl-2.5">
                      "{item.slogan}"
                    </p>
                  )}

                  {item.hashtag && (
                    <p className="text-[11px] text-pink-300 font-medium">{item.hashtag}</p>
                  )}

                  {item.intro && (
                    <p className="text-xs text-purple-200/80 line-clamp-2">{item.intro}</p>
                  )}

                  {/* Links Preview */}
                  <div className="flex flex-wrap gap-2 text-[10px] pt-1 border-t border-purple-500/20">
                    {item.linkGgai && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-900/60 border border-purple-500/30 text-purple-200">
                        🌐 GGAI có sẵn
                      </span>
                    )}
                    {item.linkDokichat && (
                      <span className="px-2 py-0.5 rounded-md bg-pink-900/60 border border-pink-500/30 text-pink-200">
                        🔗 Dokichat có sẵn
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LOCKED & DRAFT REPOSITORY */}
      {adminViewTab === 'locked_archive' && (
        <div className="space-y-4">
          {/* Filter Sub-Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#1d0636]/90 backdrop-blur-md rounded-2xl border border-purple-500/30">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                Tất Cả ({lockedList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('locked')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFilter === 'locked'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                <Lock className="w-3 h-3 text-pink-200" />
                <span>Đang Khóa ({lockedList.filter((c) => c.status === 'locked' || (!c.status && c.isLocked)).length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('draft')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFilter === 'draft'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                <FileText className="w-3 h-3 text-amber-200" />
                <span>Bản Nháp ({lockedList.filter((c) => c.status === 'draft').length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('published')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFilter === 'published'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                <Check className="w-3 h-3 text-emerald-200" />
                <span>Đã Công Khai ({lockedList.filter((c) => c.status === 'published').length})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleOpenCreateModal('locked')}
              className="text-xs text-pink-300 hover:text-white font-semibold underline cursor-pointer"
            >
              + Thêm vào kho khóa
            </button>
          </div>

          {isLoadingLockedList ? (
            <div className="py-12 text-center text-purple-300 space-y-2">
              <div className="w-8 h-8 mx-auto border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Đang tải kho nhân vật lưu trữ...</p>
            </div>
          ) : filteredLockedChars.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#1a042e]/80 border border-purple-500/30 text-center space-y-2">
              <Lock className="w-8 h-8 text-pink-400/50 mx-auto" />
              <h4 className="text-sm font-bold text-white">Chưa có nhân vật nào trong mục này</h4>
              <p className="text-xs text-purple-300/80">
                Nhấn nút "Thêm Char Mới +" để tạo nhân vật bảo mật hoặc lưu bản nháp riêng tư của bạn.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLockedChars.map((item) => {
                const isDraft = item.status === 'draft';
                const isPublished = item.status === 'published';

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#220738]/90 border border-purple-500/40 hover:border-pink-400/60 shadow-lg transition-all space-y-3.5 relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-pink-950/80 border border-pink-400/40 flex items-center justify-center text-pink-300 font-bold shrink-0">
                          {isDraft ? <FileText className="w-4 h-4 text-amber-300" /> : <Lock className="w-4 h-4 text-pink-300" />}
                        </span>
                        <div>
                          <h4 className="text-base font-serif font-bold text-white">{item.name}</h4>
                          <span className="text-[10px] text-purple-300/80">ID: {item.id}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1 ${
                          isPublished
                            ? 'bg-emerald-950/80 border-emerald-400/50 text-emerald-300'
                            : isDraft
                            ? 'bg-amber-950/80 border-amber-400/50 text-amber-300'
                            : 'bg-pink-950/80 border-pink-400/50 text-pink-300'
                        }`}
                      >
                        {isPublished ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Đã Lên Trang Chủ</span>
                          </>
                        ) : isDraft ? (
                          <>
                            <FileText className="w-3 h-3" />
                            <span>Bản Nháp</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Đang Khóa</span>
                          </>
                        )}
                      </span>
                    </div>

                    {item.slogan && (
                      <p className="text-xs text-pink-200/90 font-serif italic border-l-2 border-pink-400/50 pl-2.5">
                        "{item.slogan}"
                      </p>
                    )}

                    {item.hashtag && (
                      <p className="text-[11px] text-pink-300 font-medium">{item.hashtag}</p>
                    )}

                    {item.intro && (
                      <p className="text-xs text-purple-200/80 line-clamp-2">{item.intro}</p>
                    )}

                    {/* Actions Bottom Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-purple-500/20">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item, false)}
                          className="px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-semibold border border-purple-400/30 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3 text-pink-300" />
                          <span>Sửa</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCharacter(item.id || '', item.name, false)}
                          className="px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-200 text-xs font-semibold border border-red-500/30 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                          <span>Xóa</span>
                        </button>
                      </div>

                      {!isPublished && (
                        <button
                          type="button"
                          onClick={() => handlePublishToHomepage(item.id || '', item.name)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-300/40"
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Công Khai Lên Trang Chủ</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODAL: CREATE / EDIT CHARACTER */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#1b052d] border-2 border-pink-400/50 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/30">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-pink-950 flex items-center justify-center text-pink-300">
                  <Crown className="w-4 h-4 text-amber-300" />
                </span>
                <h3 className="text-lg font-serif font-bold text-white">
                  {editingChar ? 'Chỉnh Sửa Thông Tin Nhân Vật' : 'Thêm Nhân Vật Mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEditorModal(false)}
                className="text-purple-300 hover:text-white font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCharacter} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-purple-200 font-semibold mb-1">Tên Nhân Vật *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Chính Dương, Lạc Vân Hi, Sở Vẫn..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-1">Nơi Lưu Trữ / Trạng Thái</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'published' })}
                    className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all cursor-pointer text-xs ${
                      formData.status === 'published'
                        ? 'bg-emerald-600 text-white border border-emerald-300 shadow'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Lên Trang Chủ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'locked' })}
                    className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all cursor-pointer text-xs ${
                      formData.status === 'locked'
                        ? 'bg-pink-600 text-white border border-pink-300 shadow'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 text-pink-200" />
                    <span>Kho Khóa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'draft' })}
                    className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1 transition-all cursor-pointer text-xs ${
                      formData.status === 'draft'
                        ? 'bg-indigo-600 text-white border border-indigo-300 shadow'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-200" />
                    <span>Bản Nháp</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Hashtag Thể Loại</label>
                  <input
                    type="text"
                    value={formData.hashtag}
                    onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
                    placeholder="#CổĐại #QuyềnMưu #VươngGia..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Slogan Nhân Vật</label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    placeholder="Câu nói thâm tình..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-1">Giới Thiệu Nhân Vật (Intro)</label>
                <textarea
                  rows={2}
                  value={formData.intro}
                  onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                  placeholder="Thân phận, phong thái nhân vật..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-1">Nội Dung Cốt Truyện / Tiểu Sử</label>
                <textarea
                  rows={3}
                  value={formData.storyContent}
                  onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
                  placeholder="Nội dung kịch bản cốt truyện..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Link Dokichat</label>
                  <input
                    type="url"
                    value={formData.linkDokichat}
                    onChange={(e) => setFormData({ ...formData, linkDokichat: e.target.value })}
                    placeholder="https://www.dokichat.club/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Link GGAI</label>
                  <input
                    type="url"
                    value={formData.linkGgai}
                    onChange={(e) => setFormData({ ...formData, linkGgai: e.target.value })}
                    placeholder="https://aistudio.google.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130222] border border-purple-500/40 text-white placeholder-purple-400/60 focus:outline-none focus:border-pink-400 text-xs font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-purple-500/30">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-4 py-2 rounded-xl text-purple-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingChar}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingChar ? 'Đang lưu...' : 'Lưu Thông Tin Nhân Vật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const OwnerAdminSection = LockedCharactersSection;
