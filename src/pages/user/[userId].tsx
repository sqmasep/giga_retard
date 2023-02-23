import Card from "@/components/Card";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "../_app";
import { getPublicProfileLayout } from "@/components/ui/ProfileLayout";

const Profile: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const { data, isError, error } = trpc.posts.byProfileId.useQuery(
    { userId: query.userId as string },
    { enabled: !!query.userId }
  );

  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

Profile.getLayout = getPublicProfileLayout;

export default Profile;
