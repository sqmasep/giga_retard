import { Button as MuiButton, styled } from "@mui/material";

const Button = styled(MuiButton)(({ theme }) => ({
  boxShadow: ".5em .5em black",
  outline: theme.styling.border,
  fontWeight: 700,
  transition: ".2s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    transform: "translate(.5em, .5em)",
  },
}));

export default Button;
