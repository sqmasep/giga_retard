import Card from "@/components/Card";
import CardList from "@/components/ui/CardList";
import { trpc } from "@/utils/trpc";
import { Container, Grid, Typography } from "@mui/material";

const Posts: React.FC = () => {
  const { data } = trpc.posts.all.useQuery();

  return (
    <Container>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Typography variant='h1' fontWeight={900}>
        Les posts
      </Typography>
      {data && (
        <CardList data={data}>
          {post => (
            <Card
              postId={post.id}
              title={post.title}
              defaultSaved={!!post.savedPost[0]?.saved}
              defaultRating={post.ratedPost[0]?.rating}
              description={post.description}
              date={post.createdAt}
              authorId={post.authorId}
              authorImage={post.author?.image}
              authorName={post.author?.name}
            />
          )}
        </CardList>
      )}
    </Container>
  );
};

export default Posts;
