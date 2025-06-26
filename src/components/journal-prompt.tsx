"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen } from "lucide-react";
import { generateJournalingPrompt } from "@/ai/flows/generate-journaling-prompt";
import type { MoodLog } from "@/types";

interface JournalPromptProps {
    moodLogs: MoodLog[];
}

export default function JournalPrompt({ moodLogs }: JournalPromptProps) {
    const [prompt, setPrompt] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPrompt() {
            try {
                const moodLogsString = moodLogs
                    .map(log => `Mood: ${log.mood}, Note: ${log.note || 'N/A'}, Time: ${log.createdAt.toISOString()}`)
                    .join('\n');

                if (moodLogsString) {
                    const result = await generateJournalingPrompt({ moodLogs: moodLogsString });
                    setPrompt(result.prompt);
                } else {
                    setPrompt("What's on your mind today?");
                }
            } catch (error) {
                console.error("Failed to generate journal prompt:", error);
                setPrompt("What's on your mind today?");
            } finally {
                setIsLoading(false);
            }
        }
        fetchPrompt();
    }, [moodLogs]);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Journal Prompt
                </CardTitle>
                <CardDescription>A moment for self-reflection.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center text-center">
                {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                    <p className="text-lg font-medium">"{prompt}"</p>
                )}
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href="/journal">Write in Journal</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
