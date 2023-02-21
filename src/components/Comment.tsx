import { dateDistance } from "@/lib/date/dayFormat";
import { Delete } from "@mui/icons-material";
import {
  Link,
  Avatar,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import React from "react";

interface Comment {
  userId: string;
  userImage: string;
  userName: string;
  comment: string;
  date: Date | number;
  deleteButton?: boolean;
  reportButton?: boolean;
}

const Comment: React.FC<Comment> = ({
  userId,
  userImage,
  userName,
  comment,
  date,
  deleteButton = false,
  reportButton = false,
}) => {
  const { data: session } = useSession();
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Stack direction='column' gap={1}>
        {deleteButton && (
          <IconButton>
            <Delete />
          </IconButton>
        )}
        {reportButton && <IconButton>d</IconButton>}
        <Typography>{comment}</Typography>
        <Link
          component={NextLink}
          href={session?.user.id === userId ? "/profile" : `/user/${userId}`}
        >
          <Avatar src={userImage} alt='Auteur du commentaire' />
          <Typography variant='caption'>{userName}</Typography>
        </Link>
        <Typography variant='caption' color='gray'>
          Il y a {dateDistance(date)}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Comment;
