import Card from "@/components/Card";
import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const { data, error } = trpc.posts.byProfileId.useQuery(
    { id: query.profileId as string },
    { enabled: !!query.profileId }
  );

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <Container>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <Typography variant='h1' component='h2' fontWeight={700}>
        Les posts de
      </Typography>
      <Grid container spacing={4}>
        {data &&
          [...data].map(post => (
            <Grid key={post.id} item xs={12} sm={6} lg={4}>
              <Card
                postId={post.id}
                title={post.title}
                description={post.description}
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

export default Profile;
