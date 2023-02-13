import { Grid } from "@mui/material";
import React from "react";

interface CardListProps<T> {
  children: (card: T, i: number, arr: T[]) => React.ReactNode;
  data: T[];
}

const CardList = <T,>({ children, data }: CardListProps<T>) => {
  return (
    <Grid container spacing={4}>
      {data.map((card, i, arr) => (
        <Grid key={i} item xs={12} sm={6} lg={4}>
          {children(card, i, arr)}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
