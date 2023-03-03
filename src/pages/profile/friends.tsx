import { getPrivateProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "../_app";
import ProfileCard from "@/components/ProfileCard";
import List from "@/components/ui/List";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { Stack, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { AccessTime, Check, QuestionMark } from "@mui/icons-material";

type FriendsFilter = "ACCEPTED" | "ASKING" | "PENDING";

const Friends: NextPageWithLayout = () => {
  const [selectedTab, setSelectedTab] = useState<FriendsFilter>("ACCEPTED");
  const { data } = trpc.users.friends.ofMine.useQuery({ filter: selectedTab });
  const { data: session } = useSession();

  const myUserId = session?.user.id;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: FriendsFilter
  ) => {
    setSelectedTab(value);
  };

  return (
    <>
      <Stack gap={2} direction='row'>
        <Tabs
          orientation='vertical'
          sx={{ width: "auto" }}
          value={selectedTab}
          onChange={handleChange}
        >
          <Tab
            LinkComponent={Link}
            href='/profile/friends'
            value='ACCEPTED'
            label='Acceptés'
            icon={<Check />}
            iconPosition='start'
          />
          <Tab
            LinkComponent={Link}
            href='/profile/friends/'
            value='ASKING'
            label='Demandes'
            icon={<QuestionMark />}
            iconPosition='start'
          />
          <Tab
            LinkComponent={Link}
            href='/profile/friends/'
            value='PENDING'
            label='En attente'
            icon={<AccessTime />}
            iconPosition='start'
          />
        </Tabs>

        {data && (
          <List of={data}>
            {({ accepted, id, byUserId, toUserId, toUser, byUser }) => {
              const otherUser = myUserId === byUserId ? toUser : byUser;
              return (
                <ProfileCard
                  friendRequestId={id}
                  userId={otherUser.id}
                  userName={otherUser.name as string}
                  userImage={otherUser.image || ""}
                  lastConnection={Date.now()}
                  defaultFollow={false}
                  defaultFriend={accepted}
                  removeFriendButton={accepted}
                  acceptFriendRequestButton={!accepted && toUserId === myUserId}
                  cancelFriendButton={!accepted}
                />
              );
            }}
          </List>
        )}
      </Stack>
    </>
  );
};

Friends.getLayout = getPrivateProfileLayout;

export default Friends;
