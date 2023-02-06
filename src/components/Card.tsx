import {
  Card as MuiCard,
  CardContent,
  CardActions,
  styled,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";

import React from "react";
import Button from "./Button";

const StyledCard = styled(MuiCard)(({ theme }) => ({
  outline: theme.styling.border,
  boxShadow: ".5em .5em black",
}));

interface CardProps {
  withSaveButton?: boolean;
}

const Card: React.FC<CardProps> = ({ withSaveButton }) => {
  const { data: session } = useSession();

  return (
    <StyledCard>
      <CardContent>
        <Typography>Yes hello eveyrone</Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size='small'>
          like
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default Card;
