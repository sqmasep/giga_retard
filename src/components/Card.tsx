import useToggle from "@/hooks/useToggle";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { Bookmark, BookmarkBorder, DeleteForever } from "@mui/icons-material";
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Typography,
  Rating,
  Stack,
  Avatar,
  Checkbox,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface CardProps {
  postId: string;
  title?: string;
  description?: string;
  defaultRating?: number | null;
  defaultSaved?: boolean;
  average?: number;
  date?: Date | number;
  authorName?: string | null;
  authorImage?: string | null;
  authorId?: string | null;
  deleteButton?: boolean;
}

const Card: React.FC<CardProps> = ({
  postId,
  description,
  defaultRating = null,
  defaultSaved = false,
  title,
  authorName,
  authorImage,
  authorId,
  average,
  date,
  deleteButton,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(defaultRating);
  const [saved, setSaved] = useState(defaultSaved);
  const [isDialogOpen, toggleDialogOpen] = useToggle(false);
  const utils = trpc.useContext();

  const saveMutation = trpc.posts.save.useMutation();
  const rateMutation = trpc.posts.rate.useMutation();
  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => {
      utils.posts.invalidate();
    },
  });

  const handleSave = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: boolean
  ) => {
    setSaved(value);
    saveMutation.mutate({ saved: value, postId });
  };

  const handleRate = (
    e: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setRating(value);
    rateMutation.mutate({ rating: value, postId });
  };

  const handleDelete = () => {
    console.log(postId);
    deleteMutation.mutate({ postId });
    toggleDialogOpen(false);
  };

  return (
    <MuiCard>
      <CardContent>
        <Stack
          direction='row'
          gap={1}
          alignItems='center'
          justifyContent='space-between'
        >
          {session?.user.id !== authorId ? (
            <>
              <Stack direction='row' alignItems='center' gap={1}>
                <Rating
                  disabled={!session}
                  precision={0.5}
                  value={rating}
                  onChange={handleRate}
                />
                {average && (
                  <Typography variant='caption'>{average}</Typography>
                )}
              </Stack>
              <Checkbox
                disabled={!session}
                icon={<BookmarkBorder />}
                checkedIcon={<Bookmark />}
                checked={saved}
                onChange={handleSave}
              />
            </>
          ) : (
            deleteButton && (
              <>
                <IconButton onClick={() => toggleDialogOpen(true)}>
                  <DeleteForever />
                </IconButton>
                <Dialog
                  open={isDialogOpen}
                  onClose={() => toggleDialogOpen(false)}
                >
                  <DialogTitle>Supprimer le post "{title}" ?</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Cela causera une suppression irréversible du post!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Stack gap={2} direction='row'>
                      <Button
                        variant='outlined'
                        onClick={() => toggleDialogOpen(false)}
                      >
                        Non! Annule!
                      </Button>
                      <Button variant='contained' onClick={handleDelete}>
                        Je confirme!
                      </Button>
                    </Stack>
                  </DialogActions>
                </Dialog>
              </>
            )
          )}
        </Stack>

        <Typography mb={2} variant='h5' component='p' fontWeight={700}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        {authorImage && (
          <Stack direction='row' alignItems='center' gap={2}>
            <Tooltip title={authorName} placement='top'>
              <Link
                href={`/profile/${
                  session?.user.id === authorId ? "me" : authorId
                }`}
              >
                <Stack direction='row' alignItems='center' gap={2}>
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    src={authorImage}
                    alt='Auteur du post'
                  />
                  <Typography>{authorName}</Typography>
                </Stack>
              </Link>
            </Tooltip>
            {date && (
              <Typography variant='caption'>
                • Posté il y a {dateDistance(date)}
              </Typography>
            )}
          </Stack>
        )}
      </CardActions>
    </MuiCard>
  );
};

export default Card;
