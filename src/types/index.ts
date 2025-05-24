export type Language = 'en' | 'fr' | 'ja' | 'es' | 'it' | 'de';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  joinedAt: Date;
  language: Language;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  actorId: string;
  targetId?: string;
  read: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}