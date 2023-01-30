import { Container, Stack } from "@mui/material";
import React from "react";
import Button from "./Button";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  return (
    <Container>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Logo />
        <Button variant='contained' size='large'>
          se connecter
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
