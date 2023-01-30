import { Container, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Logo />
        <Button
          LinkComponent={Link}
          href='/api/auth/signin'
          variant='contained'
          size='large'
        >
          {session?.user ? session?.user?.name : "se connecter"}
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
