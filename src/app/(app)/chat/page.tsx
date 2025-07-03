// app/(app)/ai-counselor/page.tsx

import { ChatUI } from "@/components/chat-ui";

export default function AICounselorPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">AI Counselor</h1>
      <p className="text-muted-foreground mb-6">
        I’m here for you. Feel free to share anything you’re going through.
      </p>
      <ChatUI />
    </div>
  );
}
