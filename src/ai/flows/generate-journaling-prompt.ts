'use server';
/**
 * @fileOverview Generates personalized journaling prompts based on mood logs.
 *
 * - generateJournalingPrompt - A function that generates journaling prompts.
 * - GenerateJournalingPromptInput - The input type for the generateJournalingPrompt function.
 * - GenerateJournalingPromptOutput - The return type for the generateJournalingPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJournalingPromptInputSchema = z.object({
  moodLogs: z
    .string()
    .describe("A string containing the user's mood logs. Should include mood type, timestamp and user notes."),
});
export type GenerateJournalingPromptInput = z.infer<typeof GenerateJournalingPromptInputSchema>;

const GenerateJournalingPromptOutputSchema = z.object({
  prompt: z.string().describe('A personalized journaling prompt.'),
});
export type GenerateJournalingPromptOutput = z.infer<typeof GenerateJournalingPromptOutputSchema>;

export async function generateJournalingPrompt(input: GenerateJournalingPromptInput): Promise<GenerateJournalingPromptOutput> {
  return generateJournalingPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJournalingPromptPrompt',
  input: {schema: GenerateJournalingPromptInputSchema},
  output: {schema: GenerateJournalingPromptOutputSchema},
  prompt: `You are a thoughtful and supportive AI journaling companion. Your goal is to gently guide the user toward deeper emotional reflection and self-understanding through personalized journaling prompts.

Using the following mood logs — which include the user's moods, timestamps, and notes — create a warm, encouraging prompt that invites introspection and emotional clarity. Focus on empathy and connection.

Here are the user's mood logs:

{{{moodLogs}}}`,
});

const generateJournalingPromptFlow = ai.defineFlow(
  {
    name: 'generateJournalingPromptFlow',
    inputSchema: GenerateJournalingPromptInputSchema,
    outputSchema: GenerateJournalingPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
