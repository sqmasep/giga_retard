import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const ProfileHeader: React.FC<{
  userImage: string;
  userName: string;
  nbPosts: number | undefined | null;
}> = ({ userImage, userName, nbPosts }) => {
  return (
    <Stack my={8} direction='row' alignItems='center' gap={8}>
      <Avatar
        src={userImage || undefined}
        sx={{
          width: 300,
          height: 300,
          boxShadow: theme => theme.styling.shadow,
          outline: theme => theme.styling.outline,
        }}
        alt=''
      />
      <Box>
        <Typography variant='h1'>{userName}</Typography>
        {nbPosts && (
          <Typography>
            {nbPosts} post{nbPosts > 1 && "s"}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default ProfileHeader;
