import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { requireAuthProcedure } from "../middleware/auth";
import { router } from "../trpc";

const friendsRouter = router({
  request: requireAuthProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const askerId = ctx.session.user.id;
      const alreadyRequested = await ctx.prisma.friend.findFirst({
        where: {
          OR: [
            {
              AND: {
                byUserId: askerId,
                toUserId: input.userId,
              },
            },
            {
              AND: {
                byUserId: input.userId,
                toUserId: askerId,
              },
            },
          ],
        },
      });

      console.log(alreadyRequested);
      if (alreadyRequested) throw new TRPCError({ code: "CONFLICT" });

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
              FollowedBy: {
                where: {
                  byUserId: userId,
                },
              },
            },
          },
          toUser: {
            include: {
              FollowedBy: true,
            },
          },
        },
      });
    }),
});

export default friendsRouter;
