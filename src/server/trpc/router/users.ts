import { router } from "../trpc";
import followRouter from "./follow";
import friendsRouter from "./friends";

export const usersRouter = router({
  // friend feature, report feature
  friends: friendsRouter,
  follow: followRouter,
});
