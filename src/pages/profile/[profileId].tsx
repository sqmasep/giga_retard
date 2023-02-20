import Card from "@/components/Card";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "../_app";
import { getProfileLayout } from "@/components/ui/ProfileLayout";

const Profile: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const { data, isError, error } = trpc.posts.byProfileId.useQuery(
    { id: query.profileId as string },
    { enabled: !!query.profileId }
  );

  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return <>ui</>;
};

Profile.getLayout = getProfileLayout;

export default Profile;
