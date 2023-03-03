import { z } from "zod";
import { requireAuthProcedure } from "../middleware/auth";
import { router } from "../trpc";

const friendsRouter = router({
  // FIXME: should rename it to "request"
  add: requireAuthProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("friend request");

      return await ctx.prisma.friend.create({
        data: {
          byUserId: ctx.session.user.id,
          toUserId: input.userId,
        },
      });
    }),

  // FIXME: probably refactor this to something like .upsert() for accepted / removing a friend?
  set: requireAuthProcedure
    .input(
      z.object({
        friendRequestId: z.string().uuid(),
        accepted: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.accepted) {
        return await ctx.prisma.friend.delete({
          where: {
            id: input.friendRequestId,
          },
        });
      }

      return await ctx.prisma.friend.update({
        data: { accepted: input.accepted },
        where: {
          id: input.friendRequestId,
        },
      });
    }),

  remove: requireAuthProcedure
    .input(
      z.object({
        friendRequestId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.friend.delete({
        where: {
          // FIXME: uh uh, how to fix this. maybe use the id instead,
          // would require getting the id in user.byProfileId()?
          //
          // basically the problem is that any user can be byUser or toUser, so we cannot
          // really use it as input
          //
          // if i do so, i need to update the input
          // maybe restructure the Friend model
          // byUserId_toUserId: {
          //
          // }

          id: input.friendRequestId,
        },
      });
    }),

  ofMine: requireAuthProcedure
    .input(
      z.object({
        filter: z.enum(["ACCEPTED", "ASKING", "PENDING"]),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await ctx.prisma.friend.findMany({
        where:
          input.filter === "ACCEPTED"
            ? {
                OR: [
                  {
                    byUserId: userId,
                  },
                  {
                    toUserId: userId,
                  },
                ],
                accepted: true,
              }
            : input.filter === "ASKING"
            ? {
                toUserId: userId,
                accepted: false,
              }
            : input.filter === "PENDING"
            ? {
                byUserId: userId,
                accepted: false,
              }
            : undefined,
        include: {
          byUser: {
            include: {
              FollowedBy: true,
              Following: true,
            },
          },
          toUser: {
            include: {
              FollowedBy: true,
              Following: true,
            },
          },
        },
      });
    }),
});

export default friendsRouter;
