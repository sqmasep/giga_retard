import { Grid } from "@mui/material";
import React from "react";

interface ListProps<T> {
  children: (card: T, i: number, arr: T[]) => React.ReactNode;
  of: T[];
  gridKey: (item: T) => React.Key;
}

const List = <T extends Record<string, unknown>>({
  children,
  of,
  gridKey,
  ...props
}: ListProps<T> & Omit<React.ComponentProps<typeof Grid>, "children">) => {
  return (
    <Grid container spacing={4} {...props}>
      {of.map((item, i, arr) => (
        <Grid key={gridKey(item) ?? i} item xs={12} sm={6} lg={4}>
          {children(item, i, arr)}
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
