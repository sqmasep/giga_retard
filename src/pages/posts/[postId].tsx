import Comment from "@/components/Comment";
import CommentInput from "@/components/CommentInput";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const PostPage: React.FC = () => {
  const { data: session } = useSession();
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
      {/* ^ am i sure of that? data is already enabled when query.postId */}
      {data?.Comment.length &&
        data.Comment.map(comment => (
          <>
            <Comment
              comment={comment.comment}
              userId={comment.userId}
              userImage={comment.user.image || ""}
              userName={comment.user.name || ""}
              date={comment.createdAt}
            />
          </>
        ))}
      {query.postId && session && session.user.id !== data?.authorId && (
        <>
          {!data?.Comment.length && (
            <Typography>Soyez le premier à commenter ce post!</Typography>
          )}
          <CommentInput postId={query.postId as string} />
        </>
      )}
    </Container>
  );
};

export default PostPage;
