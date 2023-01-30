import { createContext } from "./../../../server/trpc/context";
import { appRouter } from "./../../../server/trpc/router/_app";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
