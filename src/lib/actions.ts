// "use server";

// import { z } from "zod";
// import { addMoodLog as dbAddMoodLog, addJournalEntry as dbAddJournalEntry, addSelfCareActivities as dbAddSelfCareActivities, toggleSelfCareActivity as dbToggleSelfCareActivity } from "./data";
// import { revalidatePath } from "next/cache";

// const moodLogSchema = z.object({
//     mood: z.enum(["Happy", "Calm", "Okay", "Anxious", "Sad"]),
//     note: z.string().optional(),
// });

// export async function addMoodLog(values: z.infer<typeof moodLogSchema>) {
//     // In a real app, get user ID from session
//     const userId = "1";
//     await dbAddMoodLog(userId, values.mood, values.note);
//     revalidatePath("/dashboard");
//     revalidatePath("/progress");
// }

// const journalEntrySchema = z.object({
//     prompt: z.string(),
//     content: z.string().min(1),
// });

// export async function addJournalEntry(values: z.infer<typeof journalEntrySchema>) {
//     const userId = "1";
//     await dbAddJournalEntry(userId, values.prompt, values.content);
//     revalidatePath("/journal");
// }

// export async function addSelfCareActivities(activities: string[]) {
//     const userId = "1";
//     const newActivities = await dbAddSelfCareActivities(userId, activities);
//     revalidatePath("/self-care");
//     return newActivities;
// }

// export async function toggleSelfCareActivity(activityId: string, completed: boolean) {
//     const userId = "1";
//     // The completed status is toggled in the data layer, so we don't need the `completed` param here for the mock.
//     const updatedActivity = await dbToggleSelfCareActivity(userId, activityId);
//     revalidatePath("/self-care");
//     return updatedActivity;
// }
"use server";

import { z } from "zod";
import {
  dbAddMoodLog,
  dbAddJournalEntry,
 dbAddSelfCareActivities,
  dbToggleSelfCareActivity,
} from "./data";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth.actions";

const moodLogSchema = z.object({
  mood: z.enum(["Happy", "Calm", "Okay", "Anxious", "Sad"]),
  note: z.string().optional(),
});

export async function addMoodLog(values: z.infer<typeof moodLogSchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await dbAddMoodLog(user.id, values.mood, values.note);
  revalidatePath("/dashboard");
  revalidatePath("/progress");
}

const journalEntrySchema = z.object({
  prompt: z.string(),
  content: z.string().min(1),
});

export async function addJournalEntry(values: z.infer<typeof journalEntrySchema>) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await dbAddJournalEntry({
    userId: user.id,
    prompt: values.prompt,
    content: values.content,
  });

  revalidatePath("/journal");
}

// export async function addSelfCareActivities(activities: string[]) {
//   const user = await getCurrentUser();
//   if (!user) throw new Error("Unauthorized");

//   const newActivities = await dbAddSelfCareActivities(user.id, activities);
//   revalidatePath("/self-care");
//   return newActivities;
// }
export async function addSelfCareActivities(activities: string[]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const newActivities = await dbAddSelfCareActivities(user.id, activities);
  revalidatePath("/self-care");
  return newActivities;
}



export async function toggleSelfCareActivity(activityId: string, completed: boolean) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const updatedActivity = await dbToggleSelfCareActivity(user.id, activityId);
  revalidatePath("/self-care");
  return updatedActivity;
}
