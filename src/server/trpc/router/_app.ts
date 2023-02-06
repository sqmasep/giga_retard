import { router, publicProcedure } from "./../trpc";
import { postsRouter } from "./posts";
import { newPostSchema } from "./validation/posts";

export const appRouter = router({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
