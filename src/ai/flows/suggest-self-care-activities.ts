// src/ai/flows/suggest-self-care-activities.ts
'use server';

/**
 * @fileOverview Suggests self-care activities based on user's mood, journal entries, and past moods.
 *
 * - suggestSelfCareActivities - A function that suggests self-care activities.
 * - SuggestSelfCareActivitiesInput - The input type for the suggestSelfCareActivities function.
 * - SuggestSelfCareActivitiesOutput - The return type for the suggestSelfCareActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSelfCareActivitiesInputSchema = z.object({
  currentMood: z.string().describe('The user\'s current mood (e.g., happy, sad, anxious).'),
  journalEntry: z.string().describe('The user\'s latest journal entry.'),
  pastMoods: z.string().describe('A comma-separated list of the user\'s past moods.'),
});
export type SuggestSelfCareActivitiesInput = z.infer<
  typeof SuggestSelfCareActivitiesInputSchema
>;

const SuggestSelfCareActivitiesOutputSchema = z.object({
  activities: z
    .array(z.string())
    .describe('An array of self-care activity suggestions.'),
});
export type SuggestSelfCareActivitiesOutput = z.infer<
  typeof SuggestSelfCareActivitiesOutputSchema
>;

export async function suggestSelfCareActivities(
  input: SuggestSelfCareActivitiesInput
): Promise<SuggestSelfCareActivitiesOutput> {
  return suggestSelfCareActivitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSelfCareActivitiesPrompt',
  input: {schema: SuggestSelfCareActivitiesInputSchema},
  output: {schema: SuggestSelfCareActivitiesOutputSchema},
  prompt: `Based on the user's current mood, journal entry, and past moods, suggest 3-5 self-care activities.

User's Current Mood: {{{currentMood}}}
Journal Entry: {{{journalEntry}}}
Past Moods: {{{pastMoods}}}

Suggest self-care activities that are relevant to the user's emotional state and can help improve their mental well-being. Only make suggestions if there are activities appropriate for the users logged emotions, moods and entries. If there is not enough info logged, no suggestion is made.

Format the output as a JSON array of strings.
`,
});

const suggestSelfCareActivitiesFlow = ai.defineFlow(
  {
    name: 'suggestSelfCareActivitiesFlow',
    inputSchema: SuggestSelfCareActivitiesInputSchema,
    outputSchema: SuggestSelfCareActivitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
