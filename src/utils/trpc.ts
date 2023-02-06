import { AppRouter } from "@/server/trpc/router/_app";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

const getBaseUrl = (): string => {
  return "";
};

export const trpc = createTRPCNext<AppRouter>({
  config: () => {
    return {
      transformer: superjson,
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
    };
  },
  ssr: false,
});
