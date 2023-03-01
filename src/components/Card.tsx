import useSnackbar from "@/hooks/useSnackbar";
import useToggle from "@/hooks/useToggle";
import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { Bookmark, BookmarkBorder, DeleteForever } from "@mui/icons-material";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Rating,
  Stack,
  Checkbox,
  Tooltip,
  IconButton,
  Button,
  ButtonBase,
  styled,
  Snackbar,
  Link,
} from "@mui/material";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import React, { useState } from "react";
import NamedAvatar from "./NamedAvatar";
import Confirm from "./Confirm";

interface CardProps {
  postId: string;
  title?: string;
  description?: string;
  defaultRating?: number | null;
  defaultSaved?: boolean;
  date?: Date | number;
  authorName?: string | null;
  authorImage?: string | null;
  authorId?: string | null;
  deleteButton?: boolean;
  readMore?: boolean;
  deleted?: boolean;
}

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  textAlign: "left",
  boxShadow: `
      .5em .1em black, 
      .5em .2em black, 
      .5em .3em black, 
      .5em .4em black, 
      .5em .5em black, 
      .1em .5em black, 
      .2em .5em black, 
      .3em .5em black, 
      .4em .5em black`,
  borderRadius: ".25em",
  transition: ".2s",
  "&:where(:hover, :focus-visible)": {
    boxShadow: "none",
    transform: "translate(.5em, .5em)",
  },
}));

const Card: React.FC<CardProps> = ({
  postId,
  description,
  defaultRating = null,
  defaultSaved = false,
  title,
  authorName,
  authorImage,
  authorId,
  date,
  deleteButton,
  readMore = false,
  deleted,
}) => {
  const { data: session } = useSession();
  const { data: average } = trpc.posts.rating.average.useQuery({ postId });
  const [rating, setRating] = useState(defaultRating);
  const [saved, setSaved] = useState(defaultSaved);
  const [dialog, toggleDialog] = useToggle(false);
  const snackbar = useSnackbar();
  const utils = trpc.useContext();

  const onSuccess = () => {
    utils.posts.invalidate();
  };

  const saveMutation = trpc.posts.save.useMutation({ onSuccess });
  const rateMutation = trpc.posts.rate.useMutation({ onSuccess });
  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: data => {
      onSuccess();
      snackbar.setMessage(`Le post "${data.title}" a bien été supprimé!`);
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
    toggleDialog(false);
  };

  return (
    <MuiCard sx={deleted ? { backgroundColor: "#1114" } : undefined}>
      {deleted ? (
        <CardContent sx={{ position: "relative" }}>
          <Typography variant='h5' component='p' aria-hidden='true'>
            Some fake title.. :)
          </Typography>
          <Typography aria-hidden='true'>
            Une petite description un peu random car il faut bien faire genre
            que c'était une publication mais supprimée
          </Typography>
          <Stack
            sx={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(5px)",
            }}
            alignItems='center'
            justifyContent='center'
          >
            <Typography variant='h4' component='p'>
              Post supprimé
            </Typography>
          </Stack>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <Stack
              direction='row'
              gap={1}
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack direction='row' alignItems='center' gap={1}>
                <Rating
                  disabled={!session || session.user.id === authorId}
                  precision={0.5}
                  value={rating}
                  onChange={handleRate}
                />
                {average && average.length > 0 && average[0]._avg.rating && (
                  <Tooltip title='Moyenne des votes'>
                    <Typography variant='caption'>
                      {average?.[0]?._avg.rating}/5
                    </Typography>
                  </Tooltip>
                )}
              </Stack>
              {session?.user.id !== authorId && (
                <Tooltip title='Sauvegarder le post'>
                  <Checkbox
                    disabled={!session}
                    icon={<BookmarkBorder />}
                    checkedIcon={<Bookmark />}
                    checked={saved}
                    onChange={handleSave}
                  />
                </Tooltip>
              )}
              {deleteButton && (
                <>
                  <IconButton
                    sx={{ marginLeft: "auto" }}
                    onClick={() => toggleDialog(true)}
                  >
                    <DeleteForever />
                  </IconButton>
                  <Confirm
                    open={dialog}
                    toggle={toggleDialog}
                    onConfirm={handleDelete}
                    title={`Supprimer le post "${title}" ?`}
                    description='Cela causera une suppression irréversible du post!'
                  />
                  {snackbar.open && <Snackbar onClose={snackbar.close} />}
                </>
              )}
            </Stack>

            <Typography mb={2} variant='h5' component='p' fontWeight={700}>
              {title}
            </Typography>
            <Typography>{description}</Typography>
            {readMore && (
              <Button
                variant='text'
                size='small'
                LinkComponent={NextLink}
                href={`/posts/${postId}`}
              >
                Voir plus
              </Button>
            )}
            <Stack mt={4} direction='row' alignItems='center' gap={1}>
              {authorImage && authorName && (
                <Tooltip title={authorName} placement='top'>
                  <Link
                    component={NextLink}
                    href={
                      session?.user.id === authorId
                        ? "/profile"
                        : `/user/${authorId}`
                    }
                  >
                    <NamedAvatar
                      size={24}
                      userImage={authorImage}
                      alt='Auteur du post'
                      userName={authorName}
                    />
                  </Link>
                </Tooltip>
              )}
              {date && (
                <Typography variant='caption' color='gray'>
                  {(authorImage || authorName) && "•"} Il y a{" "}
                  {dateDistance(date)}
                </Typography>
              )}
            </Stack>
          </CardContent>
          {/* <CardActions> */}
          {/* </CardActions> */}
        </>
      )}
    </MuiCard>
  );
};

export default Card;
