"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addMoodLog } from "@/lib/actions";
import { moodOptions, moodIcons, type Mood } from "@/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast({
        variant: "destructive",
        title: "No mood selected",
        description: "Please select a mood before saving.",
      });
      return;
    }
    setIsLoading(true);
    try {
      await addMoodLog({ mood: selectedMood, note });
      toast({
        title: "Mood logged",
        description: `Your ${selectedMood.toLowerCase()} mood has been saved.`,
      });
      setSelectedMood(null);
      setNote("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem saving your mood log.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {moodOptions.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg",
              selectedMood === mood
                ? "border-primary bg-primary/10 shadow-md"
                : "border-transparent bg-muted/50"
            )}
            aria-pressed={selectedMood === mood}
          >
            <span className="text-4xl">{moodIcons[mood]}</span>
            <span className="font-medium text-sm">{mood}</span>
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Add a note about your mood (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[80px]"
      />
      <Button onClick={handleSubmit} disabled={isLoading || !selectedMood} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Mood
      </Button>
    </div>
  );
}
