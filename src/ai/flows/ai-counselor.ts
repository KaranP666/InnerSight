'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string(),
});
const ChatInputSchema = z.object({
  messages: z.array(MessageSchema),
});
const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const aiCounselorPrompt = ai.definePrompt({
  name: 'aiCounselorPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `
You are a kind and thoughtful AI counselor. Always respond with empathy and encouragement. Use simple words and keep a gentle tone.

NEVER give medical advice. You are here to support emotionally and guide with kindness.

Here's the conversation so far:
{{#each messages}}
- {{role}}: {{text}}
{{/each}}

Respond as the AI counselor:
`,
});

export const aiCounselorFlow = ai.defineFlow(
  {
    name: 'aiCounselorFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await aiCounselorPrompt(input);
    return output!;
  }
);
