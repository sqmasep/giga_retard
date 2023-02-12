import { z } from "zod";

export const newPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(40, "Le titre ne peut contenir plus de 40 caractères"),
  description: z
    .string()
    .min(3)
    .max(350, "La description ne peut contenir plus de 350 caractères"),
  private: z.boolean().default(false),
});
