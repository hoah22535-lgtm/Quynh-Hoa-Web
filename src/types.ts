export interface CharacterInfo {
  id?: string; // Fixed unique string ID (e.g. 'chinh-duong')
  name: string;
  avatar: string;
  intro: string; // Giới thiệu thông tin nhân vật
  hashtag?: string; // Hashtag tự ghi (ví dụ #CổĐại #HuyềnHuyễn)
  slogan?: string; // Slogan của char
  linkDokichat?: string; // Link Dokichat
  linkGgai?: string; // Link GGAI
  linkImely?: string; // Link Imely
  link: string; // Original link
  sourceType: 'character_ai' | 'janitor_ai' | 'pinterest' | 'image_url' | 'custom_preset' | 'custom_url';
  storyContent?: string; // Nội dung cốt truyện của chính nhân vật đó trong Studio
  description?: string;
  personality?: string;
  status?: 'locked' | 'draft' | 'published';
  isLocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Inventory {
  flowers: number;
  stars: number;
  diamonds: number;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  flowers: number;
  stars: number;
  diamonds: number;
  message: string;
  timestamp: string;
}

export interface ReincarnationCommand {
  id: string;
  title: string;
  description?: string;
  content: string;
}

export interface StoryGenre {
  id: string;
  category: 'co_trang' | 'hien_dai';
  name: string;
  description: string;
  icon: string;
  badgeColor: string;
  hashtags: string[];
  votes: number;
}

export interface StudioComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'character' | 'narrator';
  content: string;
  timestamp: string;
  emotion?: string;
  actionChoices?: string[];
}

export interface StorySession {
  id: string;
  character: CharacterInfo;
  genre: string;
  userPrompt: string;
  title: string;
  summary: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface PresetCharacter {
  id: string;
  name: string;
  title: string;
  avatar: string;
  genre: string;
  description: string;
  personality: string;
  sampleLink: string;
  greeting: string;
}

