import Loading from "@/components/Loading";
import { getPrivateProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { trpc } from "@/utils/trpc";
import { Typography } from "@mui/material";
import Card from "../../components/Card";
import List from "@/components/ui/List";

const SavedPosts: NextPageWithLayout = () => {
  const { data, isError, isLoading } = trpc.posts.savedPosts.useQuery();

  return (
    <>
      {isLoading ? (
        <Loading m={12} />
      ) : data && data.length ? (
        <List of={data} gridKey={saved => saved.id}>
          {({ postId, saved, Post }) => (
            <Card
              key={postId}
              postId={postId}
              defaultSaved={saved}
              authorImage={Post.author.image}
              authorId={Post.authorId}
              authorName={Post.author.name}
              title={Post.title}
              description={Post.description}
              readMore
              defaultRating={Post.ratedPost[0]?.rating}
            />
          )}
        </List>
      ) : (
        <Typography>Pas de posts sauvegardés :(</Typography>
      )}
    </>
  );
};

SavedPosts.getLayout = getPrivateProfileLayout;

export default SavedPosts;
