export type Theme = 'light' | 'dark';

export interface Bloco {
  id: string;
  name: string;
  region: string;
  time: string;
  crowdLevel: 'low' | 'medium' | 'high';
  type: 'Rua' | 'Privado';
}

export interface Bar {
  id: string;
  name: string;
  category: 'Esquenta' | 'After' | 'Chill';
  address: string;
  lat: number;
  lng: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export enum Tab {
  BLOCOS = 'Blocos',
  BARES = 'Bares',
  DICAS = 'Dicas',
  CHECKLIST = 'Checklist'
}

// Gemini Types
export interface SearchResult {
  text: string;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}