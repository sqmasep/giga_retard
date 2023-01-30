import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

interface LogoProps {
  image?: boolean;
  text?: boolean;
}

const Logo: React.FC<LogoProps> = ({ image = true, text = true }) => {
  return (
    <Stack direction='row' alignItems='center' gap={4}>
      {image && (
        <Image src='/favicon_png.png' alt='logo' width={78} height={76} />
      )}
      {text && (
        <Typography variant='h4' component='h1' fontWeight={700}>
          giga-retard.fr
        </Typography>
      )}
    </Stack>
  );
};

export default Logo;
