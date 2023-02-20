import { Stack, Typography } from "@mui/material";
import React from "react";

interface Comment {
  userId: string;
  userImage: string;
  userName: string;
  comment: string;
}

const Comment: React.FC<Comment> = ({
  comment,
  userId,
  userImage,
  userName,
}) => {
  return (
    <Stack>
      <Typography>{comment}</Typography>
      <Typography variant='caption'>{userName}</Typography>
    </Stack>
  );
};

export default Comment;
