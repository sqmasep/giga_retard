import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    styling: {
      outline: string;
      shadow: string;
    };
  }
  interface ThemeOptions {
    styling?: {
      outline?: string;
      shadow?: string;
    };
  }
}

let theme = createTheme({
  styling: {
    outline: ".25em solid black",
    shadow: ".5em .5em black",
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
  components: {},
});

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
        fixed: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          outline: theme.styling.outline,
          boxShadow: theme.styling.shadow,
          border: "none",
          fontWeight: 700,
          transition: ".2s",
          "&:hover": {
            transform: "translate(.5em, .5em)",
            boxShadow: "none",
            border: "none",
          },
        },
        outlined: {
          color: "black",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `
            .5em .1em black, 
            .5em .2em black, 
            .5em .3em black, 
            .5em .4em black, 
            .5em .5em black, 
            .1em .5em black, 
            .2em .5em black, 
            .3em .5em black, 
            .4em .5em black`,
          padding: theme.spacing(1),
          outline: theme.styling.outline,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: theme.spacing(2),
          outline: theme.styling.outline,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          outline: theme.styling.outline,
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
