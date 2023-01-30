import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { requireAuthProcedure } from "../middleware/auth";
import { z } from "zod";

export const newPostSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(3).max(150),
});

export const postsRouter = router({
  new: requireAuthProcedure.input(newPostSchema).mutation(({ ctx }) => {}),
  all: publicProcedure.query(({ ctx }) => {
    ctx.prisma;
  }),
});
