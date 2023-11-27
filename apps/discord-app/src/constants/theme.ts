import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    dcPalette: {
      red: string;
      green: string;
      grey: {
        main: string;
        dark: string;
        darker: string;
        darkest: string;
        accent: string;
        accentHover: string;
      };
      link: string;
      input: string;
      text: {
        grey: string;
      };
    };
    dcShape: {
      borderRadius: {
        panel: string;
        input: string;
        button: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    dcPalette: {
      red: string;
      green: string;
      grey: {
        main: string;
        dark: string;
        darker: string;
        darkest: string;
        accent: string;
        accentHover: string;
      };
      link: string;
      input: string;
      text: {
        grey: string;
      };
    };
    dcShape: {
      borderRadius: {
        panel: string;
        input: string;
        button: string;
      };
    };
  }
}

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: 'rgb(88, 101, 242)',
      light: 'rgb(121, 131, 245)',
      dark: 'rgb(71, 82, 196)',
      contrastText: 'rgb(255, 255, 255)'
    },
    error: {
      main: 'rgb(250, 119, 124)'
    },
    text: {
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgb(181, 186, 193)'
    },
    background: {
      default: 'rgb(49, 51, 56)'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 830,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: '30px',
      marginBottom: '0.5rem'
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '20px'
    }
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    }
  },
  dcPalette: {
    red: 'rgb(242, 63, 66)',
    green: 'rgb(36, 128, 70)',
    grey: {
      main: 'rgb(88, 101, 242)',
      dark: 'rgb(43, 45, 49)',
      darker: 'rgb(35, 36, 40)',
      darkest: 'rgb(30, 31, 34)',
      accent: 'rgba(78, 80, 88, 0.6)',
      accentHover: 'rgba(78, 80, 88, 0.3)'
    },
    link: 'rgb(0, 168, 252)',
    input: 'rgb(219, 222, 225)',
    text: {
      grey: 'rgb(148, 155, 164)'
    }
  },
  dcShape: {
    borderRadius: {
      panel: '5px',
      input: '3px',
      button: '3px'
    }
  }
};
