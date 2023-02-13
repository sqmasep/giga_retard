import { Snackbar, styled } from "@mui/material";

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    outline: theme.styling.border,
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    fontWeight: 700,
  },
}));

export default StyledSnackbar;
