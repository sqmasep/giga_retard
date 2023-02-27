import { router } from "./../trpc";
import { commentsRouter } from "./comments";
import { postsRouter } from "./posts";
import { usersRouter } from "./users";

export const appRouter = router({
  posts: postsRouter,
  comments: commentsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
