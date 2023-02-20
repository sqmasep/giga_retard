import { router } from "./../trpc";
import { commentsRouter } from "./comments";
import { postsRouter } from "./posts";

export const appRouter = router({
  posts: postsRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
