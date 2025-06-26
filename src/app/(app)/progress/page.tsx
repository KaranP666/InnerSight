import { getMoodLogs } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodChart } from "@/components/mood-chart";

export default async function ProgressPage() {
    const moodLogs = await getMoodLogs("1");

    return (
        <div className="grid gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
                <p className="text-muted-foreground">Visualize your journey and celebrate your growth.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Mood Trends</CardTitle>
                    <CardDescription>Your mood history over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    {moodLogs.length > 1 ? 
                        <MoodChart data={moodLogs} /> :
                        <div className="flex h-80 items-center justify-center text-center text-muted-foreground">
                            <p>Not enough data to display a chart. <br/> Keep logging your mood to see your trends!</p>
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    );
}
