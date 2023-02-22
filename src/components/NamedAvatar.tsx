import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

interface NamedAvatarProps {
  alt: string;
  size?: number;
  userImage: string;
  userName: string;
}

const NamedAvatar: React.FC<NamedAvatarProps> = ({
  alt,
  size,
  userImage,
  userName,
}) => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      <Avatar
        sx={size ? { width: size, height: size } : undefined}
        src={userImage}
        alt={alt}
      />
      <Typography variant='caption'>{userName}</Typography>
    </Stack>
  );
};

export default NamedAvatar;
