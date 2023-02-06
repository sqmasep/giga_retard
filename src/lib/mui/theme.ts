import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    styling: {
      border: string;
    };
  }
  interface ThemeOptions {
    styling?: {
      border?: string;
    };
  }
}

const theme = createTheme({
  styling: {
    border: ".25em solid black",
  },
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
