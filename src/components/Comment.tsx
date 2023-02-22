import useBalance from "@/hooks/useBalance";
import useToggle from "@/hooks/useToggle";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import {
  Delete,
  Report,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import {
  Link,
  Avatar,
  IconButton,
  Paper,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import React from "react";
import NamedAvatar from "./NamedAvatar";

interface Comment {
  commentId: string;
  comment: string;
  userId: string;
  userImage: string;
  userName: string;
  date: Date | number;
  deleteButton?: boolean;
  reportButton?: boolean;
  defaultLike?: boolean;
  defaultDislike?: boolean;
}

const Comment: React.FC<Comment> = ({
  commentId,
  comment,
  userId,
  userImage,
  userName,
  date,
  deleteButton = false,
  reportButton = false,
  defaultLike = false,
  defaultDislike = false,
}) => {
  const { data: session } = useSession();
  const isAuthor = session?.user.id === userId;
  const deleteMutation = trpc.comments.delete.useMutation();
  const interactionMutation = trpc.comments.interaction.useMutation();

  const [like, dislike, balance] = useBalance(
    "LIKE",
    "DISLIKE"
  )({
    initialA: defaultLike,
    initialB: defaultDislike,
    action: interaction => {
      interactionMutation.mutate({
        commentId,
        interaction,
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ commentId });
  };
  const handleReport = () => {};

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Stack direction='column' gap={1} alignItems='start'>
        <Stack direction='row' gap={1} alignItems='center' justifyContent='end'>
          {deleteButton && session?.user.id === userId && (
            <IconButton size='small' onClick={handleDelete}>
              <Delete />
            </IconButton>
          )}
          {reportButton && !isAuthor && (
            <Tooltip title='Signaler' placement='top'>
              <IconButton size='small' onClick={handleReport}>
                <Report />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <Typography>{comment}</Typography>

        {/* FIXME: hey! you shouldnt be able to like & dislike at the same time */}
        <IconButton color='primary' onClick={() => balance("LIKE")}>
          {like ? <ThumbUp /> : <ThumbUpOffAlt />}
        </IconButton>
        <IconButton onClick={() => balance("DISLIKE")}>
          {dislike ? <ThumbDown /> : <ThumbDownOffAlt />}
        </IconButton>
        <Link
          component={NextLink}
          href={isAuthor ? "/profile" : `/user/${userId}`}
        >
          <Stack direction='row' alignItems='center' gap={1}>
            <NamedAvatar
              alt='Auteur du commentaire'
              userImage={userImage}
              userName={userName}
              size={30}
            />
          </Stack>
        </Link>
        <Typography variant='caption' color='gray'>
          Il y a {dateDistance(date)}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Comment;
