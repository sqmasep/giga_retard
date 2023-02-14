import Card from "@/components/Card";
import CardList from "@/components/ui/CardList";
import { trpc } from "@/utils/trpc";
import { Container, Tab, Tabs } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface TabProps {
  value: string;
  label: string;
  component: React.ReactNode;
}

const tabs: TabProps[] = [
  { label: "Posts", component: <></>, value: "posts" } as const,
  { label: "Stats", component: <></>, value: "stats" } as const,
];

type TabsValues = (typeof tabs)[number]["value"];

const Me: React.FC = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = trpc.posts.personalInfos.useQuery();
  const [selectedTab, setSelectedTab] = useState<TabsValues>("posts");

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: TabsValues
  ) => setSelectedTab(value);

  return (
    <Container>
      <Tabs value={selectedTab} onChange={handleChange}>
        {tabs.map(tab => (
          <Tab label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {data && (
        <CardList data={data?.posts} mt={4}>
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
