import useToggle from "@/hooks/useToggle";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { Close, PersonAddAlt1, PersonRemove } from "@mui/icons-material";
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
  userImage?: string;
  userName: string;
  defaultFollow?: boolean;
  defaultFriend?: boolean;
  lastConnection?: number | Date;
  acceptFriendRequestButton?: boolean;
  removeFriendButton?: boolean;
}

type TypeProps =
  | {
      tooltipLabel: string;
      dialogTitle: string;
      dialogDescription: string;
    }
  | false
  | undefined;

const acceptProps: TypeProps = {
  tooltipLabel: "Accepter la demande d'ami",
  dialogTitle: "",
  dialogDescription: "",
};

const removeProps: TypeProps = {
  tooltipLabel: "Supprimer mon ami",
  dialogTitle: "Supprimer votre ami ?",
  dialogDescription: "Il faudra le redemander en ami si vous vous réconciliez!",
};

const defaultProps: TypeProps = {
  tooltipLabel: "Ajouter en ami",
  dialogTitle: "",
  dialogDescription: "",
};

const ProfileCard: React.FC<FriendProps> = ({
  friendRequestId,
  userId,
  userImage,
  userName,
  lastConnection,
  defaultFollow,
  defaultFriend,
  acceptFriendRequestButton,
  removeFriendButton,
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

  const acceptFriendMutation = trpc.users.friends.accept.useMutation();

  const handleAccept = () => {
    toggleFriend();
    acceptFriendMutation.mutate({ accepted: true, friendRequestId });
  };

  const handleRemove = () => {
    toggleFriend();
    removeFriendMutation.mutate({ userId });
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
            {acceptFriendRequestButton && (
              <Tooltip title="Ignorer la demande d'ami" placement='top'>
                {/* // TODO handleRemoveFriendRequest  */}
                <SquaredIconButton color='error' onClick={() => {}}>
                  <Close />
                </SquaredIconButton>
              </Tooltip>
            )}
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
