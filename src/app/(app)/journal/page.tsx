import { getJournalEntries, getMoodLogs } from "@/lib/data";
import { addJournalEntry } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import NewJournalEntry from "@/components/journal/new-journal-entry";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth.actions";

function JournalEntryCard({ entry }: { entry: Awaited<ReturnType<typeof getJournalEntries>>[0] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {new Date(entry.createdAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardTitle>
        <CardDescription>Prompt: "{entry.prompt}"</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{entry.content}</p>
      </CardContent>
    </Card>
  )
}

export default async function JournalPage() {
   const user = await getCurrentUser();
  if (!user) redirect("/login");

  const entries = await getJournalEntries(user.id);
  // const entries = await getJournalEntries("1");
  const moodLogs = await getMoodLogs(user.id);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Journal</h1>
        <p className="text-muted-foreground">A safe space for your thoughts and feelings.</p>
      </div>

      <NewJournalEntry moodLogs={moodLogs} />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Past Entries</h2>
        {entries.length > 0 ? (
          <div className="grid gap-4">
            {entries.map(entry => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <Card className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">You haven't written any journal entries yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
