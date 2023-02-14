import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AvatarChip from "../AvatarChip";
import Logo from "../Logo";
import Add from "@mui/icons-material/Add";
import Dropdown from "./Dropdown";
import { AccountCircle, Logout } from "@mui/icons-material";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Logo />
        <Stack gap={2} direction='row' alignItems='center'>
          {session?.user ? (
            <>
              <Box position='relative'>
                <ButtonBase onClick={() => console.log("wow")}>
                  <AvatarChip
                    image={session.user.image || ""}
                    name={session.user.name || ""}
                  />
                </ButtonBase>

                <Dropdown
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    zIndex: 999,
                    transform: "translateX(-50%)",
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton LinkComponent={Link} href='/profile/me'>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText>Profil</ListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => signOut()}>
                      <ListItemIcon>
                        <Logout />
                      </ListItemIcon>
                      <ListItemText>Se déconnecter</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Dropdown>
              </Box>

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
