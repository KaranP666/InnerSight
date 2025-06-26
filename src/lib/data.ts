// This file mocks a database connection.
import type { MoodLog, JournalEntry, SelfCareActivity, GamificationStats, Mood } from '@/types';

const mockMoodLogs: MoodLog[] = [
  { id: '1', userId: '1', mood: 'Happy', note: 'Had a great day at work!', createdAt: new Date(Date.now() - 86400000 * 2) },
  { id: '2', userId: '1', mood: 'Anxious', note: 'Stressed about the upcoming presentation.', createdAt: new Date(Date.now() - 86400000 * 1) },
];

const mockJournalEntries: JournalEntry[] = [
    { id: '1', userId: '1', prompt: 'What is one thing that went well today?', content: 'I managed to finish a big project ahead of schedule, which felt amazing. I should celebrate this small win.', createdAt: new Date(Date.now() - 86400000 * 2) },
];

const mockSelfCareActivities: SelfCareActivity[] = [
    { id: '1', userId: '1', activity: 'Meditate for 10 minutes', completed: true, createdAt: new Date(Date.now() - 86400000 * 3) },
    { id: '2', userId: '1', activity: 'Go for a walk', completed: false, createdAt: new Date(Date.now() - 86400000 * 1) },
];

const mockGamificationStats: GamificationStats = {
    points: 125,
    moodStreak: 3,
    journalStreak: 2,
};


export async function getMoodLogs(userId: string): Promise<MoodLog[]> {
    return mockMoodLogs.filter(log => log.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function addMoodLog(userId: string, mood: Mood, note?: string): Promise<MoodLog> {
    const newLog: MoodLog = {
        id: (mockMoodLogs.length + 1).toString(),
        userId,
        mood,
        note,
        createdAt: new Date(),
    };
    mockMoodLogs.push(newLog);
    return newLog;
}

export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
    return mockJournalEntries.filter(entry => entry.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function addJournalEntry(userId: string, prompt: string, content: string): Promise<JournalEntry> {
    const newEntry: JournalEntry = {
        id: (mockJournalEntries.length + 1).toString(),
        userId,
        prompt,
        content,
        createdAt: new Date(),
    };
    mockJournalEntries.push(newEntry);
    return newEntry;
}

export async function getSelfCareActivities(userId: string): Promise<SelfCareActivity[]> {
    return mockSelfCareActivities.filter(activity => activity.userId === userId);
}

export async function addSelfCareActivities(userId: string, activities: string[]): Promise<SelfCareActivity[]> {
    const newActivities = activities.map((activity, index) => ({
        id: (mockSelfCareActivities.length + 1 + index).toString(),
        userId,
        activity,
        completed: false,
        createdAt: new Date(),
    }));
    mockSelfCareActivities.push(...newActivities);
    return newActivities;
}


export async function toggleSelfCareActivity(userId: string, activityId: string): Promise<SelfCareActivity | undefined> {
    const activity = mockSelfCareActivities.find(a => a.userId === userId && a.id === activityId);
    if (activity) {
        activity.completed = !activity.completed;
        return activity;
    }
    return undefined;
}


export async function getGamificationStats(userId: string): Promise<GamificationStats> {
    // In a real app, you would calculate this based on user data.
    return mockGamificationStats;
}
