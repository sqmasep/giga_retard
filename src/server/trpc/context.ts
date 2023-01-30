import { prisma } from "./../db/prisma";
import { getServerAuthSession } from "./../auth/getServerAuthSession";
import { getServerSession } from "next-auth";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = getServerAuthSession({ req, res });

  return {
    session,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
