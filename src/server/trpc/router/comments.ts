import { z } from "zod";
import { requireAuthProcedure } from "../middleware/auth";
import { publicProcedure, router } from "../trpc";
import { newCommentInput, newCommentSchema } from "./validation/comment";
import { TRPCError } from "@trpc/server";

export const commentsRouter = router({
  new: requireAuthProcedure
    .input(newCommentInput)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.prisma.comment.create({
        data: {
          comment: input.comment,
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: requireAuthProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.delete({
        where: {
          id: input.commentId,
        },
      });
    }),

  interaction: requireAuthProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
        interaction: z.enum(["LIKE", "DISLIKE"]).nullable(),
      })
    )
    .mutation(async ({ ctx, input: { interaction, commentId } }) => {
      const userId = ctx.session.user.id;

      const author = await ctx.prisma.comment.findFirst({
        where: { id: commentId },
        select: { userId: true },
      });

      // Author cannot like his own comment
      if (!author || userId === author.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (interaction === null) {
        return await ctx.prisma.commentInteraction.delete({
          where: {
            commentId_userId: {
              commentId,
              userId,
            },
          },
        });
      }

      return await ctx.prisma.commentInteraction.upsert({
        create: {
          interaction,
          userId,
          commentId,
        },
        update: {
          interaction,
        },
        where: {
          commentId_userId: {
            commentId,
            userId,
          },
        },
      });
    }),

  nbInteraction: publicProcedure
    .input(z.object({ commentId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const interactions = await ctx.prisma.commentInteraction.groupBy({
        by: ["interaction"],
        where: {
          commentId: input.commentId,
        },
        _count: {
          interaction: true,
        },
      });

      const map = new Map();
      interactions.forEach(i => map.set(i.interaction, i._count.interaction));

      return map;
    }),

  report: publicProcedure
    .input(z.object({ commentId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // FIXME: the same user can report multiple times
      // may not fix: even non-connected users can report
      return await ctx.prisma.reportComment.create({
        data: {
          userId: ctx.session?.user.id || null,
          commentId: input.commentId,
        },
      });
    }),
});
