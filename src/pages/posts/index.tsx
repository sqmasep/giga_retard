import Card from "@/components/Card";
import CardList from "@/components/ui/CardList";
import { trpc } from "@/utils/trpc";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const Posts: React.FC = () => {
  const { data, isLoading, isError } = trpc.posts.all.useQuery();

  return (
    <Container>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Typography variant='h1' textAlign='center' my={12} fontWeight={900}>
        Les posts
      </Typography>
      {isLoading && <CircularProgress />}
      {data?.length ? (
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
      ) : (
        <Stack direction='column' alignItems='center'>
          <Typography variant='h2' mb={4} textAlign='center'>
            Pas de posts :(
          </Typography>
          <Button
            variant='contained'
            size='large'
            LinkComponent={Link}
            href='/posts/new'
          >
            J'en crée un !
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default Posts;
