import { dateDistance } from "@/lib/date/dayFormat";
import { trpc } from "@/utils/trpc";
import { Bookmark, Save } from "@mui/icons-material";
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  styled,
  Typography,
  Rating,
  Stack,
  AvatarGroup,
  Avatar,
  IconButton,
} from "@mui/material";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
import Button from "./Button";

const StyledCard = styled(MuiCard)(({ theme }) => ({
  outline: theme.styling.border,
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
  padding: theme.spacing(1),
}));

interface CardProps {
  withSaveButton?: boolean;
  title?: string;
  description?: string;
  defaultRating?: number;
  average?: number;
  by?: unknown;
  date?: Date | number;
}

const Card: React.FC<CardProps> = ({
  description,
  defaultRating = 0,
  title,
  by,
  average,
  date,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(defaultRating);
  // trpc.posts.

  return (
    <StyledCard>
      <CardContent>
        <Stack direction='row' gap={1} alignItems='center'>
          <Rating
            value={rating}
            onChange={(_, newRating) => setRating(newRating || 0)}
          />
          <Typography variant='caption'>4.5</Typography>
          <AvatarGroup>
            <Avatar
              sx={{ width: 20, height: 20 }}
              src='https://mui.com/static/images/avatar/5.jpg'
            />
            <Avatar
              sx={{ width: 20, height: 20 }}
              src='https://mui.com/static/images/avatar/3.jpg'
            />
            <Avatar
              sx={{ width: 20, height: 20 }}
              src='https://mui.com/static/images/avatar/4.jpg'
            />
            <Avatar
              sx={{ width: 20, height: 20 }}
              src='https://mui.com/static/images/avatar/9.jpg'
            />
            <Avatar
              sx={{ width: 20, height: 20 }}
              src='https://mui.com/static/images/avatar/1.jpg'
            />
            <Avatar
              sx={{ width: 20, height: 20 }}
              src='https://mui.com/static/images/avatar/2.jpg'
            />
          </AvatarGroup>
        </Stack>

        <Typography variant='h5' component='p' fontWeight={700}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Bookmark />
        </IconButton>
        <Typography variant='caption'>
          il y a {date && dateDistance(date)}
        </Typography>
      </CardActions>
    </StyledCard>
  );
};

export default Card;
