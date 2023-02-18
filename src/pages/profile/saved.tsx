import Me, { getProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { trpc } from "@/utils/trpc";
import React from "react";
import Card from "../../components/Card";
import CardList from "../../components/ui/CardList";

const SavedPosts: NextPageWithLayout = () => {
  const { data } = trpc.posts.savedPosts.useQuery();

  return (
    <>
      {data && (
        <CardList data={data}>
          {({ Post, postId }) => <Card postId={postId} defaultSaved={true} />}
        </CardList>
      )}
    </>
  );
};

SavedPosts.getLayout = getProfileLayout;

export default SavedPosts;
