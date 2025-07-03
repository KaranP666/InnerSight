import {
  getMoodLogs,
  getJournalEntries,
  getSelfCareActivities,
} from "@/lib/data";
import ActivityList from "@/components/self-care/activity-list";
import { getCurrentUser } from "@/lib/auth.actions";
import { redirect } from "next/navigation";

export default async function SelfCarePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const moodLogs = await getMoodLogs(user.id);
  const journalEntries = await getJournalEntries(user.id);
  const initialActivities = await getSelfCareActivities(user.id);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Self-Care Activities
        </h1>
        <p className="text-muted-foreground">
          Nurture your mind and body with personalized suggestions.
        </p>
      </div>

      <ActivityList
        moodLogs={moodLogs}
        journalEntries={journalEntries}
        initialActivities={initialActivities}
      />
    </div>
  );
}
