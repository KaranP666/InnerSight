import { getUser } from "@/lib/auth";
import { getGamificationStats, getMoodLogs } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { moodIcons, moodOptions, type MoodLog } from "@/types";
import { addMoodLog } from "@/lib/actions";
import MoodTracker from "@/components/mood-tracker";
import JournalPrompt from "@/components/journal-prompt";

async function GamificationStats() {
  const stats = await getGamificationStats("1");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Keep up the great work!</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around">
        <div className="text-center">
          <p className="text-2xl font-bold">{stats.points}</p>
          <p className="text-sm text-muted-foreground">Points</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{stats.moodStreak}</p>
          <p className="text-sm text-muted-foreground">Mood Streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{stats.journalStreak}</p>
          <p className="text-sm text-muted-foreground">Journal Streak</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const user = await getUser();
  
  const moodLogs = await getMoodLogs("1");

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a look at your wellness journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>Log your mood to track your emotional patterns.</CardDescription>
          </CardHeader>
          <CardContent>
            <MoodTracker />
          </CardContent>
        </Card>
        
        <JournalPrompt moodLogs={moodLogs} />
      </div>

      <GamificationStats />
    </div>
  );
}
