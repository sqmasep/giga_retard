import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { data: session } = useSession();

  return (
    <Container>
      <Stack direction='column'>
        <Typography variant='h1' fontWeight={700}>
          Partagez vos histoires de giga-retard
        </Typography>

        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2}>
          {!session && (
            <Button
              variant='contained'
              size='large'
              LinkComponent={Link}
              href='/api/auth/signin'
            >
              Connectez-moi !
            </Button>
          )}
          <Button
            variant='outlined'
            size='large'
            LinkComponent={Link}
            href='/posts'
          >
            Voir les posts
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
