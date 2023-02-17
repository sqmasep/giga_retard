import Card from "@/components/Card";
import CardList from "@/components/ui/CardList";
import MyPosts from "@/components/ui/MyPosts";
import useSettingsStore from "@/store/settings";
import { trpc } from "@/utils/trpc";
import {
  BarChart,
  Bookmark,
  Description,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Stack,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface TabProps {
  value: string;
  label: string;
  component: React.ReactNode;
  icon: React.ReactNode;
}

const tabs = [
  {
    label: "Mes posts",
    component: <MyPosts />,
    value: "myPosts",
    icon: <Description />,
  } as const,
  {
    label: "Stats",
    component: <></>,
    value: "stats",
    icon: <BarChart />,
  } as const,
  {
    label: "Sauvegardés",
    component: <></>,
    value: "savedPosts",
    icon: <Bookmark />,
  } as const,
  {
    label: "Amis",
    component: <></>,
    value: "friends",
    icon: <PeopleAlt />,
  } as const,
] satisfies TabProps[];

type TabsValues = (typeof tabs)[number]["value"];

const Me: React.FC = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = trpc.posts.personalInfos.useQuery();
  const [selectedTab, setSelectedTab] = useState<TabsValues>("myPosts");

  const settings = useSettingsStore();

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: TabsValues
  ) => setSelectedTab(value);

  return (
    <Container>
      <Stack my={8} direction='row' alignItems='center' gap={8}>
        <Avatar
          src={session?.user.image || undefined}
          sx={{
            width: 300,
            height: 300,
            boxShadow: theme => theme.styling.shadow,
            outline: theme => theme.styling.outline,
          }}
          alt=''
        />
        <Box>
          <Typography variant='h1'>{session?.user.name}</Typography>
          {data?.posts && (
            <Typography>
              {data.posts.length} post{data.posts.length > 1 && "s"}
            </Typography>
          )}
        </Box>
      </Stack>
      <Tabs value={selectedTab} onChange={handleChange} selectionFollowsFocus>
        {tabs.map(tab => (
          <Tab
            label={tab.label}
            value={tab.value}
            icon={tab.icon}
            iconPosition='start'
            sx={{
              transition: "text-shadow .2s",
              "&:hover": {
                // textShadow: theme =>
                //   `.1em .1em 0em ${theme.palette.primary.dark}`,
                color: theme => theme.palette.primary.main,
              },
            }}
          />
        ))}
      </Tabs>

      <FormControlLabel
        label='Masquer les posts supprimés'
        control={
          <Switch
            value={settings.maskDeleted}
            onChange={() => settings.toggleMaskDeleted()}
          />
        }
      />

      {data && (
        <CardList data={data?.posts} mt={4}>
          {post => (
            <Card
              title={post.title}
              description={post.description}
              postId={post.id}
              authorId={post.authorId}
              deleteButton
              deleted={post.deleted}
              date={post.createdAt}
            />
          )}
        </CardList>
      )}
    </Container>
  );
};

export default Me;
