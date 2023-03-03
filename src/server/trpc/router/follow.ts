import { z } from "zod";
import { requireAuthProcedure } from "../middleware/auth";
import { router } from "../trpc";

const followRouter = router({
  // new convention? if yes, need to fix other ones later
  set: requireAuthProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        follow: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, follow } = input;

      return await ctx.prisma.follow.upsert({
        create: {
          userId,
          byUserId: ctx.session.user.id,
        },
        update: {
          follow: follow,
        },
        where: {
          byUserId_userId: {
            byUserId: ctx.session.user.id,
            userId,
          },
        },
      });
    }),

  ofMine: requireAuthProcedure.query(async ({ ctx, input }) => {
    const byUserId = ctx.session.user.id;

    return await ctx.prisma.follow.findMany({
      where: {
        byUserId,
      },
      include: {
        user: true,
      },
    });
  }),

  me: requireAuthProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    return await ctx.prisma.follow.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }),
});

export default followRouter;
