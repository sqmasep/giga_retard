import { Add } from "@mui/icons-material";
import { Box, Fab, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";

const Overlay: React.FC = () => {
  return (
    <>
      <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 4 }}>
        <Fab
          color='primary'
          aria-label='Nouveau post'
          LinkComponent={Link}
          href='/posts/new'
        >
          <Add />
        </Fab>
      </Box>
    </>
  );
};

export default Overlay;
