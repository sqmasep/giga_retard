import { Avatar, Chip, styled } from "@mui/material";
import React from "react";

interface AvatarChipProps {
  image: string;
  name: string;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  outline: theme.styling.border,
}));

const AvatarChip: React.FC<AvatarChipProps> = ({ image, name }) => {
  return <StyledChip avatar={<Avatar src={image} />} label={name} />;
};

export default AvatarChip;
