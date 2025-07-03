"use client";

import { sendChatToAICounselor } from "@/lib/actions";
import { Mic } from "lucide-react";
import { useState } from "react";
import VoiceInput from "./voice-input";

export function ChatUI() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const handleTranscript = (transcript: string) => {
    setInput((prev) => prev.trim() + " " + transcript.trim());
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const response = await sendChatToAICounselor([...messages, userMsg]);
    setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md h-[400px] overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm ${
              msg.role === "user"
                ? "text-right"
                : "text-left text-muted-foreground"
            }`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what’s on your mind..."
          className="flex-1 border rounded-md p-2"
        />
        <VoiceInput onTranscript={handleTranscript} />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
