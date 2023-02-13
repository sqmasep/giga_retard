import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AvatarChip from "../AvatarChip";
import Logo from "../Logo";
import Add from "@mui/icons-material/Add";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Logo />
        <Stack gap={2} direction='row' alignItems='center'>
          {session?.user ? (
            <>
              <AvatarChip
                image={session.user.image || ""}
                name={session.user.name || ""}
              />
              <Tooltip title='Nouveau post'>
                <IconButton LinkComponent={Link} href='/posts/new'>
                  <Add />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Button
              LinkComponent={Link}
              href='/api/auth/signin'
              variant='contained'
              size='large'
            >
              Se connecter
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
