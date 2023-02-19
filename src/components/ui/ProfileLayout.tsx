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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

interface TabProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const tabs = [
  {
    label: "Mes posts",
    value: "myPosts",
    icon: <Description />,
    href: "/profile",
  } as const,
  {
    label: "Stats",
    value: "stats",
    icon: <BarChart />,
    href: "/profile/stats",
  } as const,
  {
    label: "Sauvegardés",
    value: "savedPosts",
    icon: <Bookmark />,
    href: "/profile/saved",
  } as const,
  {
    label: "Amis",
    value: "friends",
    icon: <PeopleAlt />,
    href: "/profile/friends",
  } as const,
] satisfies TabProps[];

type TabsValues = (typeof tabs)[number]["value"];

const Me: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = trpc.posts.personalInfos.useQuery();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(router.pathname);

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
      <Tabs value={selectedTab} onChange={handleChange} sx={{ mb: 2 }}>
        {tabs.map(tab => (
          <Tab
            label={tab.label}
            value={tab.href}
            icon={tab.icon}
            iconPosition='start'
            LinkComponent={Link}
            href={tab.href}
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

      {children}
    </Container>
  );
};

export const getProfileLayout = (page: ReactElement) => <Me>{page}</Me>;

export default Me;
