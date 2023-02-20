import { Stack } from "@mui/material";
import React from "react";

// TODO center {children} with a Stack JCC AIC
const DisplayMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Stack justifyContent='center' alignItems='center'>
      {children}
    </Stack>
  );
};

export default DisplayMessage;
