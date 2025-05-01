import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "本文は必須").max(100, "本文は100字以内"),
  postId: z.string(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
