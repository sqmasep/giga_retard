import { redisCache } from "./../lib/redis";
import { prisma } from "../lib/prisma";
import { getServerAuthSession } from "./../auth/getServerAuthSession";
import { getServerSession } from "next-auth";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerAuthSession({ req, res });

  return {
    session,
    prisma,
    redisCache,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
