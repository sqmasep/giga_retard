import { trpc } from "@/utils/trpc";
import { PersonRemove } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface FriendProps {
  userId: string;
  userImage?: string;
  userName: string;
  lastConnection?: string;
  since?: string;
}

const Friend: React.FC<FriendProps> = ({
  userId,
  userImage,
  userName,
  lastConnection,
}) => {
  const removeMutation = trpc.users.friends.remove.useMutation();

  const handleRemove = () => {
    removeMutation;
  };
  return (
    <Card>
      <CardContent>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={userImage} alt='Friend' />
          <Typography fontWeight={700}>{userName}</Typography>
          <IconButton>
            <PersonRemove />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Friend;
