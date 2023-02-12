import { getServerSession } from "next-auth";
import { type GetServerSidePropsContext } from "next";
import { authOptions } from "./authOptions";

export const getServerAuthSession = async ({
  req,
  res,
}: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(req, res, authOptions);
};
