import useToggle from "@/hooks/useToggle";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import {
  Check,
  Close,
  PersonAddAlt1,
  PersonRemove,
  Star,
} from "@mui/icons-material";
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
  friendRequestId: string;
  userId: string;
  userName: string;
  userImage?: string;
  defaultFollow?: boolean;
  defaultFriend?: boolean;
  lastConnection?: number | Date;
  acceptFriendRequestButton?: boolean;
  removeFriendButton?: boolean;
  cancelFriendButton?: boolean;
}

type TypeProps =
  | Partial<{
      tooltipLabel: string;
      dialogTitle: string;
      dialogDescription: string;
    }>
  | false
  | undefined;

const acceptProps: TypeProps = {
  tooltipLabel: "Accepter la demande d'ami",
};

const removeProps: TypeProps = {
  tooltipLabel: "Supprimer mon ami",
  dialogTitle: "Supprimer votre ami ?",
  dialogDescription: "Il faudra le redemander en ami si vous vous réconciliez!",
};

const defaultProps: TypeProps = {
  tooltipLabel: "Ajouter en ami",
};

const ProfileCard: React.FC<FriendProps> = ({
  friendRequestId,
  userId,
  userImage,
  userName,
  lastConnection,
  defaultFollow = false,
  defaultFriend = false,
  acceptFriendRequestButton,
  removeFriendButton,
  cancelFriendButton,
}) => {
  const [follow, toggleFollow] = useToggle(defaultFollow);
  const [friend, toggleFriend] = useToggle(defaultFriend);
  const [dialog, toggleDialog] = useToggle();

  const utils = trpc.useContext();
  const onSuccess = () => utils.users.friends.invalidate();

  const removeFriendMutation = trpc.users.friends.remove.useMutation({
    onSuccess,
  });
  const setFriendMutation = trpc.users.friends.set.useMutation({
    onSuccess,
  });

  const followMutation = trpc.users.follow.set.useMutation({
    // FIXME: might not really invalidate anything, since most of the requests are from "post" route
    onSuccess: () => utils.users.friends.invalidate(),
  });

  const handleAccept = () => {
    toggleFriend();
    setFriendMutation.mutate({ accepted: true, friendRequestId });
  };

  const handleRemove = () => {
    toggleFriend();
    removeFriendMutation.mutate({ friendRequestId });
  };

  const handleCancel = () => {
    setFriendMutation.mutate({ accepted: false, friendRequestId });
  };

  const handleFollow = () => {
    // FIXME: omg that's terrible i should update my hook
    // i also should fix those two non-linked actions that are everywhere
    // it works but it's ugly solution
    toggleFollow(!follow);
    followMutation.mutate({ follow: !follow, userId });
  };

  const typeProps = acceptFriendRequestButton
    ? acceptProps
    : removeFriendButton
    ? removeProps
    : defaultProps;

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
            {/* FIXME: should be a link */}
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
            {cancelFriendButton && (
              <Tooltip title="Retirer la demande d'ami" placement='top'>
                <SquaredIconButton color='error' onClick={handleCancel}>
                  <Close />
                </SquaredIconButton>
              </Tooltip>
            )}
            {(removeFriendButton || acceptFriendRequestButton) && (
              <Tooltip title={typeProps.tooltipLabel} placement='top'>
                <SquaredIconButton
                  onClick={() =>
                    acceptFriendRequestButton
                      ? handleAccept()
                      : toggleDialog(true)
                  }
                >
                  {removeFriendButton ? (
                    <PersonRemove fontSize='small' />
                  ) : (
                    acceptFriendRequestButton && <Check color='success' />
                  )}
                </SquaredIconButton>
              </Tooltip>
            )}
            <Confirm
              open={dialog}
              toggle={toggleDialog}
              onConfirm={handleRemove}
              title='Supprimer votre ami ?'
              description='Il faudra le redemander en ami si vous vous réconciliez!'
            />
          </Stack>
        </Stack>

        <Button
          size='small'
          sx={{ mt: 2 }}
          color={follow ? "error" : "primary"}
          onClick={handleFollow}
          startIcon={follow ? <Close /> : <Star />}
        >
          {follow ? "Ne plus suivre" : "Suivre"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
