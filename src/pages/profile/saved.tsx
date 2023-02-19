import Loading from "@/components/Loading";
import Me, { getProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { trpc } from "@/utils/trpc";
import { Typography } from "@mui/material";
import React from "react";
import Card from "../../components/Card";
import CardList from "../../components/ui/CardList";

const SavedPosts: NextPageWithLayout = () => {
  const { data, isError, isLoading } = trpc.posts.savedPosts.useQuery();

  return (
    <>
      {isLoading ? (
        <Loading m={12} />
      ) : data && data.length ? (
        <CardList data={data}>
          {({ postId, saved, Post }) => (
            <Card
              postId={postId}
              defaultSaved={saved}
              authorImage={Post.author.image}
              authorId={Post.authorId}
              authorName={Post.author.name}
              title={Post.title}
              description={Post.description}
              readMore
              defaultRating={Post.ratedPost[0].rating}
            />
          )}
        </CardList>
      ) : (
        <Typography>Pas de posts sauvegardés :(</Typography>
      )}
    </>
  );
};

SavedPosts.getLayout = getProfileLayout;

export default SavedPosts;
