import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button, Container, Stack, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Container>
      <Stack direction='column'>
        <Typography variant='h1' fontWeight={700}>
          Partagez vos histoires de giga-retard
        </Typography>

        <Stack direction='row' alignItems='center' flexWrap='wrap'>
          <Button variant='contained' size='large'>
            Connectez-moi !
          </Button>
          <Button variant='outlined' size='large'>
            Connectez-moi !
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
