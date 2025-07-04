"use client";

import { sendChatToAICounselor } from "@/lib/actions";
import { useState, useRef, useEffect } from "react";
import VoiceInput from "./voice-input";

export function ChatUI() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="bg-muted p-4 rounded-md h-[400px] overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`break-words ${
              msg.role === "user"
                ? "text-right text-black"
                : "text-left text-muted-foreground"
            }`}
          >
            <span className="whitespace-pre-line">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what’s on your mind..."
          className="w-full border rounded-md p-2 text-sm"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <VoiceInput onTranscript={handleTranscript} />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-md text-sm"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div> */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share what’s on your mind..."
            rows={2}
            className="w-full border rounded-md p-2 resize-none overflow-hidden text-sm focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 items-center">
          <VoiceInput onTranscript={handleTranscript} />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-md text-sm"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
