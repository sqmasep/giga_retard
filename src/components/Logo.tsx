import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";

interface LogoProps {
  image?: boolean;
  text?: boolean;
}

const Logo: React.FC<LogoProps> = ({ image = true, text = true }) => {
  return (
    <>
      {image && <Image src='/favicon_png.png' alt='logo' />}
      {text && <Typography>gigachad.fr</Typography>}
    </>
  );
};

export default Logo;
