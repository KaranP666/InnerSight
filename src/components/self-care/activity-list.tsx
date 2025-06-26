"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { suggestSelfCareActivities } from "@/ai/flows/suggest-self-care-activities";
import { addSelfCareActivities as addActivitiesAction, toggleSelfCareActivity as toggleActivityAction } from "@/lib/actions";
import type { MoodLog, JournalEntry, SelfCareActivity } from "@/types";

interface ActivityListProps {
    moodLogs: MoodLog[];
    journalEntries: JournalEntry[];
    initialActivities: SelfCareActivity[];
}

export default function ActivityList({ moodLogs, journalEntries, initialActivities }: ActivityListProps) {
    const [activities, setActivities] = useState<SelfCareActivity[]>(initialActivities);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerateActivities = async () => {
        setIsLoading(true);
        try {
            const currentMood = moodLogs[0]?.mood || "Okay";
            const journalEntry = journalEntries[0]?.content || "";
            const pastMoods = moodLogs.slice(1).map(log => log.mood).join(", ");
            
            const result = await suggestSelfCareActivities({ currentMood, journalEntry, pastMoods });
            
            if (result.activities && result.activities.length > 0) {
                const newActivities = await addActivitiesAction(result.activities);
                setActivities(prev => [...newActivities, ...prev]);
                toast({
                    title: "New activities suggested!",
                    description: "We've added some new self-care ideas for you.",
                });
            } else {
                toast({
                    title: "No new suggestions",
                    description: "We couldn't find any new suggestions right now. Try logging more moods or journals!",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not generate self-care activities.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleToggleActivity = async (id: string, completed: boolean) => {
        const originalActivities = [...activities];
        
        // Optimistically update UI
        setActivities(activities.map(a => a.id === id ? { ...a, completed: !completed } : a));

        const result = await toggleActivityAction(id, !completed);
        if (!result) {
            // Revert on failure
            setActivities(originalActivities);
            toast({
                variant: "destructive",
                title: "Update failed",
                description: "Could not update the activity. Please try again.",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <CardTitle>Your Activity Checklist</CardTitle>
                        <CardDescription>Check off activities as you complete them.</CardDescription>
                    </div>
                    <Button onClick={handleGenerateActivities} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Suggest New Activities
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-center space-x-3 rounded-md border p-4 transition-colors hover:bg-accent/50">
                                <Checkbox
                                    id={activity.id}
                                    checked={activity.completed}
                                    onCheckedChange={() => handleToggleActivity(activity.id, activity.completed)}
                                    aria-label={`Mark ${activity.activity} as complete`}
                                />
                                <label
                                    htmlFor={activity.id}
                                    className={`flex-1 text-sm font-medium leading-none ${activity.completed ? 'text-muted-foreground line-through' : ''}`}
                                >
                                    {activity.activity}
                                </label>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <p>No activities yet. Click the button above to get some personalized suggestions!</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
