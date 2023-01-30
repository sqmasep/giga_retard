import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

const getBaseUrl = (): string => {
  return "";
};

export const trpc = createTRPCNext({
  config: () => {
    return {
      transformer: superjson,
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
    };
  },
});
