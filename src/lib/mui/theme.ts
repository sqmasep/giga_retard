import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    styling: {
      outline: string;
      shadow: string;
      roundness: string;
    };
  }
  interface ThemeOptions {
    styling?: {
      outline?: string;
      shadow?: string;
      roundness?: string;
    };
  }
}

let theme = createTheme({
  styling: {
    outline: ".25em solid black",
    shadow: `
            .5em .1em black,
            .5em .2em black,
            .5em .3em black,
            .5em .4em black,
            .5em .5em black,
            .1em .5em black,
            .2em .5em black,
            .3em .5em black,
            .4em .5em black`,
    roundness: ".25em",
  },
  palette: {
    primary: {
      // main: "#ff7777",
      main: "#0469FF",
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
          "&:is(:hover, :focus-visible)": {
            transform: "translate(.5em, .5em)",
            boxShadow: "none",
            border: "none",
          },
        },
        outlined: {
          color: "black",
        },
        text: {
          outline: "none",
          boxShadow: "none",
          "&:is(:hover, :focus-visible)": {
            transform: "none",
            boxShadow: theme.styling.shadow,
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          outline: theme.styling.outline,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          outline: theme.styling.outline,
          borderRadius: theme.styling.roundness,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          paddingBottom: 0,
          outline: theme.styling.outline,
          boxShadow: theme.styling.shadow,
          transition: ".2s",
          "&:is(:hover, :focus-visible)": {
            transform: "translate(.5em, .5em)",
            boxShadow: "none",
            border: "none",
          },
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
    MuiLink: {
      // styleOverrides: {},
      defaultProps: { underline: "hover" },
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
} as ThemeOptions);

theme = responsiveFontSizes(theme);

export default theme;
