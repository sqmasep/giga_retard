import { Grid } from "@mui/material";
import React from "react";

interface ListProps<T> {
  children: (card: T, i: number, arr: T[]) => React.ReactNode;
  of: T[];
}

const List = <T,>({
  children,
  of,
  ...props
}: ListProps<T> & Omit<React.ComponentProps<typeof Grid>, "children">) => {
  return (
    <Grid container spacing={4} {...props}>
      {of.map((card, i, arr) => (
        <Grid key={i} item xs={12} sm={6} lg={4}>
          {children(card, i, arr)}
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
