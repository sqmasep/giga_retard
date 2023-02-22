import { z } from "zod";
import { requireAuthProcedure } from "../middleware/auth";
import { router } from "../trpc";
import { newCommentInput, newCommentSchema } from "./validation/comment";

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
});
