import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { requireAuthProcedure } from "../middleware/auth";
import { z } from "zod";
import { newPostSchema } from "./validation/posts";

export const postsRouter = router({
  new: requireAuthProcedure
    .input(newPostSchema)
    .mutation(async ({ ctx, input }) => {
      const { description, title } = input;
      await ctx.prisma.post.create({
        data: {
          title,
          description,
          author: ctx.session.user,
        },
      });
      console.log(ctx.session.user.name, input);
    }),

  save: requireAuthProcedure.mutation(({ ctx, input }) => {}),

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany();
  }),
});
