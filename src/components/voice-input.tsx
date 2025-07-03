"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";

type VoiceInputProps = {
  onTranscript: (text: string) => void;
};

export default function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);

    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onTranscript(text); // Send to parent input
    };

    if (isRecording) recognition.start();

    return () => recognition.abort(); // Clean up
  }, [isRecording]);

  return (
    <button
      type="button"
      onClick={() => setIsRecording((prev) => !prev)}
      className={`rounded-full p-2 ${isRecording ? "bg-red-200 animate-pulse" : "bg-gray-100"}`}
      title={isRecording ? "Stop Recording" : "Start Voice Input"}
    >
      {isRecording ? <MicOff className="text-red-600" /> : <Mic className="text-gray-600" />}
    </button>
  );
}
