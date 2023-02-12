import { publicProcedure } from "./../trpc";
import { middleware } from "../trpc";
import { TRPCError } from "@trpc/server";

const authMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user)
    throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: { ...ctx.session.user },
      },
    },
  });
});

export const requireAuthProcedure = publicProcedure.use(authMiddleware);
