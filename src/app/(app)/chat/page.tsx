import { ChatUI } from "@/components/chat-ui";

export default function AICounselorPage() {
  return (
    <div className="px-4 sm:px-6 py-6 w-full max-w-2xl mx-auto overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4">AI Counselor</h1>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        I’m here for you. Feel free to share anything you’re going through.
      </p>
      <ChatUI />
    </div>
  );
}
