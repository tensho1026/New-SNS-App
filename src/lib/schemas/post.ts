import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, "本文は必須").max(280, "本文は280字以内"),
  imageUrl: z.string().url().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
