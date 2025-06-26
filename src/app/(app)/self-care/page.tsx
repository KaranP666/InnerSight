import { getMoodLogs, getJournalEntries, getSelfCareActivities } from "@/lib/data";
import ActivityList from "@/components/self-care/activity-list";

export default async function SelfCarePage() {
    const moodLogs = await getMoodLogs("1");
    const journalEntries = await getJournalEntries("1");
    const initialActivities = await getSelfCareActivities("1");

    return (
        <div className="grid gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Self-Care Activities</h1>
                <p className="text-muted-foreground">Nurture your mind and body with personalized suggestions.</p>
            </div>
            
            <ActivityList 
                moodLogs={moodLogs} 
                journalEntries={journalEntries}
                initialActivities={initialActivities} 
            />
        </div>
    );
}
