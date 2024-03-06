import { ThemeOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    dcPalette: {
      green: {
        '360': string;
      };
      grey: {
        main: string;
        darker: string;
        accent: string;
        accentHover: string;
      };
      link: string;
      text: {
        grey: string;
        normal: string;
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
        primary: string;
        secondary: string;
        tertiary: string;
        modifierAccent: string;
      };
      status: {
        danger: string;
      };
      header: {
        primary: string;
      };
    };
    dcShape: {
      borderRadius: {
        panel: string;
        input: string;
        button: string;
        modal: string;
        serverNav: string;
      };
      defaultWidth: {
        modal: string;
      };
      defaultHeight: {
        header: string;
      };
      boxShadow: {
        elevationLow: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    dcPalette?: {
      green: {
        '360': string;
      };
      grey: {
        main: string;
        darker: string;
        accent: string;
        accentHover: string;
      };
      link: string;
      text: {
        grey: string;
        normal: string;
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
        primary: string;
        secondary: string;
        tertiary: string;
        modifierAccent: string;
      };
      status: {
        danger: string;
      };
      header: {
        primary: string;
      };
    };
    dcShape?: {
      borderRadius: {
        panel: string;
        input: string;
        button: string;
        modal: string;
        serverNav: string;
      };
      defaultWidth: {
        modal: string;
      };
      defaultHeight: {
        header: string;
      };
      boxShadow: {
        elevationLow: string;
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
    green: {
      '360': 'rgb(35, 165, 89)'
    },
    grey: {
      main: 'rgb(88, 101, 242)',
      darker: 'rgb(35, 36, 40)',
      accent: 'rgba(78, 80, 88, 0.6)',
      accentHover: 'rgba(78, 80, 88, 0.3)'
    },
    link: 'rgb(0, 168, 252)',
    text: {
      grey: 'rgb(148, 155, 164)',
      normal: 'rgb(219, 222, 225)'
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
      primary: 'rgb(49, 51, 56)',
      secondary: 'rgb(43, 45, 49)',
      tertiary: 'rgb(30, 31, 34)',
      modifierAccent: 'rgba(78, 80, 88, 0.48)'
    },
    status: {
      danger: 'rgb(242, 63, 66)'
    },
    header: {
      primary: 'rgb(242, 243, 245)'
    }
  },
  dcShape: {
    borderRadius: {
      panel: '5px',
      input: '3px',
      button: '3px',
      modal: '4px',
      serverNav: '15px'
    },
    defaultWidth: {
      modal: '440px'
    },
    defaultHeight: {
      header: '48px'
    },
    boxShadow: {
      elevationLow:
        '0 1px 0 hsl(0 calc( 1 * 0%) 0.8% / 0.2), 0 1.5px 0 hsl(240 calc( 1 * 7.7%) 2.5% / 0.05), 0 2px 0 hsl(0 calc( 1 * 0%) 0.8% / 0.05)'
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
