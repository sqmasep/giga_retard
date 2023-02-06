import { z } from "zod";

export const newPostSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(3).max(150),
  private: z.boolean().default(false),
});
