import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React from "react";

const PostPage: React.FC = () => {
  const { query } = useRouter();
  const { data, error, isLoading } = trpc.posts.byPostId.useQuery({
    postId: query.postId as string,
  });

  return <></>;
};

export default PostPage;
