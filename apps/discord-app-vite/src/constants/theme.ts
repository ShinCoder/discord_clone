import { ThemeOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    dcPalette: {
      green: string;
      grey: {
        main: string;
        darker: string;
        darkest: string;
        accent: string;
        accentHover: string;
      };
      link: string;
      text: {
        grey: string;
        normal: string;
        headerPrimary: string;
      };
      primary: {
        '100': string;
        '630': string;
        '730': string;
      };
      button: {
        secondaryBackground: string;
      };
      white: {
        '500': string;
      };
      background: {
        secondary: string;
      };
      status: {
        danger: string;
      };
    };
    dcShape: {
      borderRadius: {
        panel: string;
        input: string;
        button: string;
        modal: string;
      };
      defaultWidth: {
        modal: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    dcPalette?: {
      green: string;
      grey: {
        main: string;
        darker: string;
        darkest: string;
        accent: string;
        accentHover: string;
      };
      link: string;
      text: {
        grey: string;
        normal: string;
        headerPrimary: string;
      };
      primary: {
        '100': string;
        '630': string;
        '730': string;
      };
      button: {
        secondaryBackground: string;
      };
      white: {
        '500': string;
      };
      background: {
        secondary: string;
      };
      status: {
        danger: string;
      };
    };
    dcShape?: {
      borderRadius: {
        panel: string;
        input: string;
        button: string;
        modal: string;
      };
      defaultWidth: {
        modal: string;
      };
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    white: true;
  }
}

const defaultThemeOptions: ThemeOptions = {
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
    green: 'rgb(36, 128, 70)',
    grey: {
      main: 'rgb(88, 101, 242)',
      darker: 'rgb(35, 36, 40)',
      darkest: 'rgb(30, 31, 34)',
      accent: 'rgba(78, 80, 88, 0.6)',
      accentHover: 'rgba(78, 80, 88, 0.3)'
    },
    link: 'rgb(0, 168, 252)',
    text: {
      grey: 'rgb(148, 155, 164)',
      normal: 'rgb(219, 222, 225)',
      headerPrimary: 'rgb(242, 243, 245)'
    },
    primary: {
      '100': 'rgb(249, 249, 249)',
      '630': 'rgb(43, 45, 49)',
      '730': 'rgb(26, 27, 30)'
    },
    button: {
      secondaryBackground: 'rgb(78, 80, 88)'
    },
    white: {
      '500': 'rgb(255, 255, 255)'
    },
    background: {
      secondary: 'rgb(43, 45, 49)'
    },
    status: {
      danger: 'rgb(242, 63, 66)'
    }
  },
  dcShape: {
    borderRadius: {
      panel: '5px',
      input: '3px',
      button: '3px',
      modal: '4px'
    },
    defaultWidth: {
      modal: '440px'
    }
  }
};

let defaultTheme = createTheme(defaultThemeOptions);

defaultTheme = createTheme(
  {
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'white' },
            style: {
              color: defaultTheme.dcPalette.text.grey,
              backgroundColor: defaultTheme.palette.common.white,
              '&:hover': {
                color: defaultTheme.palette.common.white,
                backgroundColor: defaultTheme.palette.augmentColor({
                  color: { main: defaultTheme.palette.common.white }
                }).dark
              }
            }
          }
        ]
      }
    }
  },
  defaultTheme
);

export { defaultThemeOptions, defaultTheme };
