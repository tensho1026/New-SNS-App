import { z } from "zod";

export const createProfileSchema = z.object({
  username:z.string().min(1,"名前は1文字以上").max(10,"名前は１０文字まで!").optional(),
  content: z.string().min(1, "本文は必須").max(280, "本文は280字以内").optional(),
  imageUrl: z.string().url().optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
