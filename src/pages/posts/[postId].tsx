import CommentInput from "@/components/CommentInput";
import { trpc } from "@/utils/trpc";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const PostPage: React.FC = () => {
  const { query } = useRouter();
  const { data, error, isLoading } = trpc.posts.byPostId.useQuery(
    {
      postId: query.postId as string,
    },
    { enabled: !!query.postId }
  );

  return (
    <Container>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* FIXME: query && query.postId but cleaner */}
      <CommentInput postId={query.postId} />
    </Container>
  );
};

export default PostPage;
