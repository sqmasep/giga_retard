import { trpc } from "@/utils/trpc";
import { PersonAdd } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const ProfileHeader: React.FC<{
  userId: string;
  userImage: string;
  userName: string;
  nbPosts: number | undefined | null;
}> = ({ userId, userImage, userName, nbPosts }) => {
  const { data: session } = useSession();
  const isSameUser = session?.user.id === userId;
  const { data } = trpc.posts.byProfileId.useQuery({ userId });

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
        {!isSameUser && (
          <Stack direction='row' gap={1} alignItems='center'>
            <Chip icon={<PersonAdd />} clickable color='success'>
              <Typography>Ajouter en ami</Typography>
            </Chip>
          </Stack>
        )}
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
