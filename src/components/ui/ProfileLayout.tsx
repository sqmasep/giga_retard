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
import { z } from "zod";

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

const ProfileHeader: React.FC<{
  userImage: string;
  userName: string;
  nbPosts: number | undefined | null;
}> = ({ userImage, userName, nbPosts }) => {
  return (
    <Stack my={8} direction='row' alignItems='center' gap={8}>
      <Avatar
        src={userImage || undefined}
        sx={{
          width: 300,
          height: 300,
          boxShadow: theme => theme.styling.shadow,
          outline: theme => theme.styling.outline,
        }}
        alt=''
      />
      <Box>
        <Typography variant='h1'>{userName}</Typography>
        {nbPosts && (
          <Typography>
            {nbPosts} post{nbPosts > 1 && "s"}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

const PersonalInfos: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(router.pathname);
  const { data } = trpc.posts.personalInfos.useQuery();
  const { data: session } = useSession();

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: TabsValues
  ) => setSelectedTab(value);

  return (
    <>
      <ProfileHeader
        nbPosts={1}
        userImage={session?.user.image || ""}
        userName={session?.user.name || ""}
      />
      c mon profil ça!
      <Tabs value={selectedTab} onChange={handleChange} sx={{ mb: 2 }}>
        {tabs.map(tab => (
          <Tab
            key={tab.href}
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
    </>
  );
};

const PublicInfos: React.FC<{ userId: string }> = ({ userId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = trpc.posts.byProfileId.useQuery({
    id: userId,
  });

  if (session?.user.id === userId) router.push("/profile");

  return (
    <>
      <ProfileHeader nbPosts={2} userImage={""} userName={""} />
      public profile!
    </>
  );
};

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { query } = useRouter();
  const uuidSchema = z.string().uuid();
  const res = uuidSchema.safeParse(query.profileId);

  if (!res.success) return <PersonalInfos>{children}</PersonalInfos>;

  return <PublicInfos userId={query.profileId as string} />;
};

export const getProfileLayout = (page: ReactElement) => (
  <ProfileLayout>{page}</ProfileLayout>
);

export default ProfileLayout;
