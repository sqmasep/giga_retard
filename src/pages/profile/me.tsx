import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import React from "react";

const Me: React.FC = () => {
  const { data: session } = useSession();

  return <></>;
};

export default Me;
