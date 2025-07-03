// This file mocks a database connection.
import type { MoodLog, JournalEntry, SelfCareActivity, GamificationStats, Mood } from '@/types';
import { getCurrentUser } from './auth.actions';
import { revalidatePath } from 'next/cache';
import { format } from "date-fns";

export async function getMoodLogs(userId: string): Promise<MoodLog[]> {
  return prisma?.moodLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function dbAddMoodLog(
  userId: string,
  mood: Mood,
  note?: string
) {
  return prisma?.moodLog.create({
    data: {
      userId,
      mood,
      note,
    },
  });
}

export async function getJournalEntries(userId: string): Promise<JournalEntry[]> {
  return prisma?.journalEntry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function dbAddJournalEntry({
  userId,
  prompt,
  content,
}: {
  userId: string;
  prompt: string;
  content: string;
}) {
  await prisma.journalEntry.create({
    data: {
      userId,
      prompt,
      content,
    },
  });
}

export async function getSelfCareActivities(userId: string): Promise<SelfCareActivity[]> {
  return prisma.selfCareActivity.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function dbAddSelfCareActivities(userId: string, activities: string[]): Promise<SelfCareActivity[]> {
  return await Promise.all(
    activities.map(activity =>
      prisma.selfCareActivity.create({
        data: {
          userId,
          activity,
        },
      })
    )
  );
}

export async function dbToggleSelfCareActivity(userId: string, activityId: string) {
  const activity = await prisma.selfCareActivity.findFirst({
    where: { id: activityId, userId },
  });

  if (!activity) return;

  return prisma.selfCareActivity.update({
    where: { id: activity.id },
    data: { completed: !activity.completed },
  });
}


// export async function getGamificationStats(userId: string): Promise<GamificationStats> {
//   const points = await prisma.moodLog.count({ where: { userId } }) * 5;

//   return {
//     userId,
//     points,
//     moodStreak: 3, // replace with logic if needed
//     journalStreak: 2, // replace with logic if needed
//   };
// }
// Helper: Calculate streak based on consecutive daily entries
function getStreak(dates: Date[]): number {
  const seen = new Set(dates.map((d) => format(d, "yyyy-MM-dd")));
  let streak = 0;

  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = format(date, "yyyy-MM-dd");

    if (seen.has(formatted)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// 🏆 Gamification Stats
export async function getGamificationStats(userId: string): Promise<GamificationStats> {
  const moodLogs = await prisma.moodLog.findMany({
    where: { userId },
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const journalEntries = await prisma.journalEntry.findMany({
    where: { userId },
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const points = moodLogs.length * 5; // 5 points per mood entry
  const moodStreak = getStreak(moodLogs.map((log) => log.createdAt));
  const journalStreak = getStreak(journalEntries.map((entry) => entry.createdAt));

  return {
    userId,
    points,
    moodStreak,
    journalStreak,
  };
}