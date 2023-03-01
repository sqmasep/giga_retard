import Card from "@/components/Card";
import Comment from "@/components/Comment";
import CommentInput from "@/components/CommentInput";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { Container, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const PostPage: React.FC = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const { data, error, isLoading, isSuccess } = trpc.posts.byPostId.useQuery(
    {
      postId: query.postId as string,
    },
    { enabled: !!query.postId }
  );

  return (
    <Container maxWidth='md'>
      <Stack gap={4}>
        {/* FIXME: rating & saved not showing, we should get it through `data` */}
        {isSuccess && (
          <Card
            key={data.id}
            postId={query.postId as string}
            authorId={data?.authorId}
            authorImage={data?.author.image}
            authorName={data?.author.name}
            title={data?.title}
            description={data?.description}
            defaultRating={data.ratedPost?.[0]?.rating}
            defaultSaved={data.savedPost?.[0]?.saved}
          />
        )}
        {/* FIXME: query && query.postId but cleaner */}
        {/* ^ am i sure of that? data is already enabled when query.postId */}
        {data?.Comment.length && (
          <Stack gap={2}>
            {data.Comment.map(comment => (
              <Comment
                key={comment.id}
                commentId={comment.id}
                comment={comment.comment}
                userId={comment.userId}
                userImage={comment.user.image || ""}
                userName={comment.user.name || ""}
                date={comment.createdAt}
                deleteButton
                reportButton
                defaultDislike={
                  comment.CommentInteraction[0]?.interaction === "DISLIKE"
                }
                defaultLike={
                  comment.CommentInteraction[0]?.interaction === "LIKE"
                }
              />
            ))}
          </Stack>
        )}

        {query.postId && session && session.user.id !== data?.authorId && (
          <>
            {!data?.Comment.length && (
              <Typography>Soyez le premier à commenter ce post!</Typography>
            )}
            <CommentInput postId={query.postId as string} />
          </>
        )}
      </Stack>
    </Container>
  );
};

export default PostPage;
