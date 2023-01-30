import { authOptions } from "./../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { type GetServerSidePropsContext } from "next";

export const getServerAuthSession = async ({
  req,
  res,
}: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(req, res, authOptions);
};
