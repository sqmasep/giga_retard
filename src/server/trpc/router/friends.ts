import { z } from "zod";
import { requireAuthProcedure } from "../middleware/auth";
import { router } from "../trpc";

const friendsRouter = router({
  add: requireAuthProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.friend.create({
        data: {
          byUserId: ctx.session.user.id,
          toUserId: input.userId,
        },
      });
    }),

  // FIXME: probably refactor this to something like .upsert() for accepted / removing a friend?
  accept: requireAuthProcedure
    .input(
      z.object({
        friendRequestId: z.string().uuid(),
        accepted: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.friend.update({
        data: { accepted: input.accepted },
        where: {
          id: input.friendRequestId,
        },
      });
    }),

  remove: requireAuthProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.friend.delete({
        where: {
          // FIXME: uh uh, how to fix this. maybe use the id instead,
          // would require getting the id in user.byProfileId()?
          // if i do so, i need to update the input
          // maybe restructure the Friend model
          // byUserId_toUserId: {
          //
          // }
        },
      });
    }),
});

export default friendsRouter;
