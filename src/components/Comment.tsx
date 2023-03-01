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
  const { data } = trpc.comments.nbInteraction.useQuery({ commentId });
  const isAuthor = session?.user.id === userId;

  const utils = trpc.useContext();
  const deleteMutation = trpc.comments.delete.useMutation({
    onSuccess: () => {
      // FIXME: the router is not well structured i guess, it holds
      utils.comments.invalidate();
    },
  });
  const interactionMutation = trpc.comments.interaction.useMutation({
    onSuccess: () => {
      utils.comments.nbInteraction.invalidate();
    },
  });
  const reportMutation = trpc.comments.report.useMutation();

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
    // FIXME: need confirm obviously
    deleteMutation.mutate({ commentId });
  };

  const handleReport = () => {
    // FIXME: need confirm obviously
    reportMutation.mutate({ commentId });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack gap={2} alignItems='start'>
        <Stack direction='row' gap={1} alignItems='center' justifyContent='end'>
          {deleteButton && session?.user.id === userId && (
            <Tooltip title='Supprimer' placement='top'>
              <IconButton size='small' onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
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

        <Stack direction='row' gap={1}>
          <Stack alignItems='center' direction='row'>
            <IconButton
              disabled={isAuthor || !session?.user}
              color='primary'
              onClick={() => balance("LIKE")}
            >
              {like ? <ThumbUp /> : <ThumbUpOffAlt />}
            </IconButton>
            <Typography variant='caption'>{data?.get("LIKE") ?? 0}</Typography>
          </Stack>

          <Stack alignItems='center' direction='row'>
            <IconButton
              disabled={isAuthor || !session?.user}
              onClick={() => balance("DISLIKE")}
            >
              {dislike ? <ThumbDown /> : <ThumbDownOffAlt />}
            </IconButton>
            <Typography variant='caption'>
              {data?.get("DISLIKE") ?? 0}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction='row' alignItems='center' gap={1}>
          <Link
            component={NextLink}
            href={isAuthor ? "/profile" : `/user/${userId}`}
          >
            <NamedAvatar
              alt='Auteur du commentaire'
              userImage={userImage}
              userName={userName}
              size={30}
            />
          </Link>
          <Typography variant='caption' color='gray'>
            • Il y a {dateDistance(date)}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Comment;
