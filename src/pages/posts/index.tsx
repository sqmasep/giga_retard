import Card from "@/components/Card";
import { trpc } from "@/utils/trpc";
import { Container, Grid } from "@mui/material";

const Posts: React.FC = () => {
  const { data } = trpc.posts.all.useQuery();

  return (
    <Container>
      <Grid container>
        {data?.map(post => (
          <Grid key={post.id} item xs={12} sm={6} lg={4}>
            <Card title={post.title} description={post.description} />
          </Grid>
        ))}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Grid>
    </Container>
  );
};

export default Posts;
