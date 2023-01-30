import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7777",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Unbounded",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
        fixed: true,
      },
    },
  },
});

export default theme;
