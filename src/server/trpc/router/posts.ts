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

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user.email || undefined,
        },
        select: {
          id: true,
        },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const post = await ctx.prisma.post.create({
        data: {
          description,
          title,
          userId: user?.id,
        },
      });

      console.log(post);
    }),

  save: requireAuthProcedure
    .input(
      z.object({
        save: z.boolean(),
        id: z.string().uuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.postSaved.update({
        where: {
          id: input.id,
        },
        data: {},
      });
    }),

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany({
      include: {
        user: true,
        PostRating: true,
        PostSaved: true,
      },
    });
  }),
});
