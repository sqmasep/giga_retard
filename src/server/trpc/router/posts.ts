import { TRPCError } from "@trpc/server";
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

      return await ctx.prisma.post.create({
        data: {
          description,
          title,
          authorId: ctx.session.user.id,
        },
      });
    }),

  save: requireAuthProcedure
    .input(
      z.object({
        saved: z.boolean(),
        postId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.savedPost.upsert({
        where: {
          userId_postId: {
            userId: ctx.session.user.id,
            postId: input.postId,
          },
        },
        update: {
          saved: input.saved,
        },
        create: {
          saved: input.saved,
          userId: ctx.session.user.id,
          postId: input.postId,
        },
      });
    }),

  rate: requireAuthProcedure
    .input(
      z.object({ id: z.string().uuid(), rating: z.number().min(0).max(5) })
    )
    .query(({ ctx, input }) => {}),

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }),

  byProfileId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.post.findMany({
        where: {
          authorId: input.id,
        },
      });
    }),
});
