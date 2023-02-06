import { Button as MuiButton, styled } from "@mui/material";

// TODO - DRY principle: we have Button and LoadingButton, they should have the same style though
// const styles = ({theme}) => {}

const Button = styled(MuiButton)(({ theme }) => ({
  boxShadow: ".5em .5em black",
  outline: theme.styling.border,
  border: "none",
  fontWeight: 700,
  transition: ".2s",
  "&:hover": {
    transform: "translate(.5em, .5em)",
    boxShadow: "none",
    border: "none",
  },
}));

export default Button;
