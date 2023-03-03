import { trpc } from "@/utils/trpc";
import {
  BarChart,
  Bookmark,
  Description,
  PeopleAlt,
  Star,
} from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";

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
  {
    label: "Follow",
    value: "follow",
    icon: <Star />,
    href: "/profile/follow",
  } as const,
] satisfies TabProps[];

type TabsValues = (typeof tabs)[number]["value"];

const PersonalProfile: React.FC<{ children: React.ReactNode }> = ({
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
      {session?.user && (
        <ProfileHeader
          nbPosts={data?.posts.length}
          userId={session.user.id}
          // FIXME: remove the `|| ""` pls
          userImage={session.user.image || ""}
          userName={session.user.name || ""}
        />
      )}
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

export default PersonalProfile;
