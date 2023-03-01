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
import Confirm from "./Confirm";
import SquaredIconButton from "./SquaredIconButton";

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
  const [dialog, toggleDialog] = useToggle();

  const utils = trpc.useContext();

  const removeFriendMutation = trpc.users.friends.remove.useMutation({
    onSuccess: () => {
      utils.users.friends.invalidate();
    },
  });

  const handleRemove = () => {
    toggleFriend();
    removeFriendMutation.mutate({ userId });
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
              <SquaredIconButton onClick={() => toggleDialog(true)}>
                {friend ? (
                  <PersonRemove fontSize='small' />
                ) : (
                  <PersonAddAlt1 fontSize='small' />
                )}
              </SquaredIconButton>
            </Tooltip>
            <Confirm
              open={dialog}
              toggle={toggleDialog}
              onConfirm={handleRemove}
              title='Supprimer votre ami ?'
              description='Il faudra le redemander en ami si vous vous réconciliez!'
            />
          </Stack>
        </Stack>
        <Button>folo</Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
