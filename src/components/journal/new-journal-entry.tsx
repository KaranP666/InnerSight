"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addJournalEntry } from "@/lib/actions";
import { generateJournalingPrompt } from "@/ai/flows/generate-journaling-prompt";
import type { MoodLog } from "@/types";

interface NewJournalEntryProps {
  moodLogs: MoodLog[];
}

export default function NewJournalEntry({ moodLogs }: NewJournalEntryProps) {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isPromptLoading, setIsPromptLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPrompt() {
        setIsPromptLoading(true);
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
            setIsPromptLoading(false);
        }
    }
    fetchPrompt();
  }, [moodLogs]);

  const handleSubmit = async () => {
    if (!content.trim() || !prompt) {
      toast({
        variant: "destructive",
        title: "Entry is empty",
        description: "Please write something before saving.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addJournalEntry({ prompt, content });
      toast({
        title: "Journal entry saved!",
        description: "Your thoughts have been securely stored.",
      });
      setContent("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem saving your journal entry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Entry</CardTitle>
        <CardDescription>
          {isPromptLoading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin"/> Generating a prompt for you...
            </span>
          ) : (
            `Today's prompt: "${prompt}"`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] text-base"
          disabled={isSubmitting || isPromptLoading}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isSubmitting || isPromptLoading} className="ml-auto">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  );
}
