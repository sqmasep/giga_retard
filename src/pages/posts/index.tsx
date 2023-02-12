import Card from "@/components/Card";
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
      <Grid mt={8} container spacing={4}>
        {data?.map(post => (
          <Grid key={post.id} item xs={12} sm={6} lg={4}>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
