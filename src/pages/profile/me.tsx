import Card from "@/components/Card";
import CardList from "@/components/ui/CardList";
import { trpc } from "@/utils/trpc";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Me: React.FC = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = trpc.posts.personalInfos.useQuery();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      {data && (
        <CardList data={data?.posts}>
          {post => (
            <Card
              title={post.title}
              description={post.description}
              postId={post.id}
              authorId={post.authorId}
              deleteButton
              date={post.createdAt}
            />
          )}
        </CardList>
      )}
    </Container>
  );
};

export default Me;
