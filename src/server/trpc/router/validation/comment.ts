import { z } from "zod";

const comment = z.string().min(3).max(420);

export const newCommentSchema = z.object({
  comment,
});

export const newCommentInput = z.object({
  comment,
  postId: z.string().uuid(),
});
