import { Stack } from "@mui/material";
import React from "react";

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
