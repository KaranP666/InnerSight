export type User = {
  id: string;
  name: string;
  email: string;
};

export type Mood = 'Happy' | 'Calm' | 'Okay' | 'Anxious' | 'Sad';

export const moodOptions: Mood[] = ['Happy', 'Calm', 'Okay', 'Anxious', 'Sad'];

export const moodIcons: Record<Mood, string> = {
  Happy: '😊',
  Calm: '😌',
  Okay: '😐',
  Anxious: '😟',
  Sad: '😢',
};


export type MoodLog = {
  id: string;
  userId: string;
  mood: Mood;
  note?: string;
  createdAt: Date;
};

export type JournalEntry = {
  id: string;
  userId: string;
  prompt: string;
  content: string;
  createdAt: Date;
  moodLogId?: string;
};

export type SelfCareActivity = {
  id: string;
  userId: string;
  activity: string;
  completed: boolean;
  createdAt: Date;
};

export type GamificationStats = {
  userId: string,
  points: number;
  moodStreak: number;
  journalStreak: number;
};
