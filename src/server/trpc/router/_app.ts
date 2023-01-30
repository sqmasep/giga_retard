import { router, publicProcedure } from "./../trpc";

export const appRouter = router({
  test: publicProcedure.query(({}) => {}),
});

export type AppRouter = typeof appRouter;
