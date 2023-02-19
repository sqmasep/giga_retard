import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const Loading: React.FC<React.ComponentProps<typeof Stack>> = ({
  ...props
}) => {
  return (
    <Stack gap={2} alignItems='center' justifyContent='center' {...props}>
      <CircularProgress />
      <Typography>Ça charge bouge pas</Typography>
    </Stack>
  );
};

export default Loading;
