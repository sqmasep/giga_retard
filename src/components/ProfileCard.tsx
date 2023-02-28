import useToggle from "@/hooks/useToggle";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { PersonAddAlt1, PersonRemove } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface FriendProps {
  userId: string;
  userImage?: string;
  userName: string;
  defaultFollow?: boolean;
  defaultFriend?: boolean;
  lastConnection?: number | Date;
}

const ProfileCard: React.FC<FriendProps> = ({
  userId,
  userImage,
  userName,
  lastConnection,
  defaultFollow,
  defaultFriend,
}) => {
  const [follow, toggleFollow] = useToggle(defaultFollow);
  const [friend, toggleFriend] = useToggle(defaultFriend);

  const removeFriendMutation = trpc.users.friends.remove.useMutation();

  const handleRemove = () => {
    toggleFriend();
    removeFriendMutation;
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          gap={1}
        >
          <Stack direction='row' alignItems='center' gap={2}>
            <Avatar src={userImage} alt='Friend' />
            <Stack>
              <Typography fontWeight={700}>{userName}</Typography>
              {lastConnection !== undefined && (
                <Typography color='gray' variant='caption'>
                  Dernière connexion il y a {dateDistance(lastConnection)}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack direction='row' alignItems='center' gap={1}>
            <Tooltip
              title={friend ? "Retirer des amis" : "Ajouter en ami"}
              placement='top'
            >
              <IconButton
                sx={{
                  borderRadius: 2,
                  border: "2px solid #eee",
                }}
                centerRipple={false}
                onClick={handleRemove}
              >
                {friend ? (
                  <PersonRemove fontSize='small' />
                ) : (
                  <PersonAddAlt1 fontSize='small' />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Button>folo</Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
