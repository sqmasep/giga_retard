import Card from "@/components/Card";
import List from "@/components/ui/List";
import { trpc } from "@/utils/trpc";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";

const Posts: React.FC = () => {
  const { data, isLoading, isError } = trpc.posts.all.useQuery();

  return (
    <Container>
      <Head>
        <title>giga-retard - les posts</title>
      </Head>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Typography variant='h1' textAlign='center' mt={12} fontWeight={900}>
        Les posts
      </Typography>

      <Box
        sx={{
          borderRadius: "50rem",
          outline: theme => theme.styling.outline,
          boxShadow: theme => theme.styling.shadow,
          my: 8,
          maxWidth: "50rem",
          mx: "auto",
        }}
      >
        <Checkbox />
      </Box>

      {data?.length ? (
        <List of={data} gridKey={post => post.id}>
          {post => (
            <Card
              postId={post.id}
              title={post.title}
              defaultSaved={!!post?.savedPost?.[0]?.saved}
              defaultRating={post?.ratedPost?.[0]?.rating}
              description={post.description}
              date={post.createdAt}
              readMore
              authorId={post.authorId}
              authorImage={post.author?.image}
              authorName={post.author?.name}
            />
          )}
        </List>
      ) : isLoading ? (
        <CircularProgress />
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
