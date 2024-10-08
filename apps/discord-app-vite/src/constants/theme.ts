import { ThemeOptions, createTheme } from '@mui/material/styles';

const placeholderColor = 'hsl(0, 100%, 100%)';

interface PaletteConstants {
  saturationFactor: number;

  'blue-hsl': {
    '345': string;
  };
  'green-hsl': {
    '330': string;
    '360': string;
    '430': string;
  };
  'primary-hsl': {
    '100': string;
    '130': string;
    '330': string;
    '360': string;
    '500': string;
    '600': string;
    '630': string;
    '700': string;
    '730': string;
  };
  'red-hsl': {
    '400': string;
  };
  'white-hsl': {
    base: string;
  };

  blue: {
    '345': string;
  };
  green: {
    '330': string;
    '360': string;
    '430': string;
  };
  primary: {
    '100': string;
    '130': string;
    '330': string;
    '360': string;
    '600': string;
    '630': string;
    '700': string;
    '730': string;
  };
  red: {
    '400': string;
  };
  white: {
    base: string;
  };
}

let paletteConstants: PaletteConstants = {
  saturationFactor: 1,

  'blue-hsl': {
    '345': placeholderColor
  },
  'green-hsl': {
    '330': placeholderColor,
    '360': placeholderColor,
    '430': placeholderColor
  },
  'primary-hsl': {
    '100': placeholderColor,
    '130': placeholderColor,
    '330': placeholderColor,
    '360': placeholderColor,
    '500': placeholderColor,
    '600': placeholderColor,
    '630': placeholderColor,
    '700': placeholderColor,
    '730': placeholderColor
  },
  'red-hsl': {
    '400': placeholderColor
  },
  'white-hsl': {
    base: placeholderColor
  },

  blue: {
    '345': placeholderColor
  },
  green: {
    '330': placeholderColor,
    '360': placeholderColor,
    '430': placeholderColor
  },
  primary: {
    '100': placeholderColor,
    '130': placeholderColor,
    '330': placeholderColor,
    '360': placeholderColor,
    '600': placeholderColor,
    '630': placeholderColor,
    '700': placeholderColor,
    '730': placeholderColor
  },
  red: {
    '400': placeholderColor
  },
  white: {
    base: placeholderColor
  }
};

paletteConstants = {
  ...paletteConstants,

  'blue-hsl': {
    '345': `201 calc(${paletteConstants.saturationFactor} * 100%) 59%`
  },
  'green-hsl': {
    '330': `146 calc(${paletteConstants.saturationFactor} * 63.1%) 47.8%`,
    '360': `145 calc(${paletteConstants.saturationFactor} * 65%) 39.2%`,
    '430': `142 calc(${paletteConstants.saturationFactor} * 56.1%) 32.2%`
  },
  'primary-hsl': {
    '100': `0 calc(${paletteConstants.saturationFactor} * 0%) 97.6%`,
    '130': `220 calc(${paletteConstants.saturationFactor} * 13%) 95.5%`,
    '330': `215 calc(${paletteConstants.saturationFactor} * 8.8%) 73.3%`,
    '360': `214 calc(${paletteConstants.saturationFactor} * 8.1%) 61.2%`,
    '500': `228 calc(${paletteConstants.saturationFactor} * 6%) 32.5%`,
    '600': `223 calc(${paletteConstants.saturationFactor} * 6.7%) 20.6%`,
    '630': `220 calc(${paletteConstants.saturationFactor} * 6.5%) 18%`,
    '700': `225 calc(${paletteConstants.saturationFactor} * 6.3%) 12.5%`,
    '730': `225 calc(${paletteConstants.saturationFactor} * 7.1%) 11%`
  },
  'red-hsl': {
    '400': `359 calc(${paletteConstants.saturationFactor} * 87.3%) 59.8%`
  },
  'white-hsl': {
    base: `0 calc(${paletteConstants.saturationFactor} * 0%) 100`
  }
};

paletteConstants = {
  ...paletteConstants,

  blue: {
    '345': `hsl(${paletteConstants['blue-hsl'][345]} / 1)`
  },
  green: {
    '330': `hsl(${paletteConstants['green-hsl'][330]} / 1)`,
    '360': `hsl(${paletteConstants['green-hsl'][360]} / 1)`,
    '430': `hsl(${paletteConstants['green-hsl'][430]} / 1)`
  },
  primary: {
    '100': `hsl(${paletteConstants['primary-hsl'][100]} / 1)`,
    '130': `hsl(${paletteConstants['primary-hsl'][130]} / 1)`,
    '330': `hsl(${paletteConstants['primary-hsl'][330]} / 1)`,
    '360': `hsl(${paletteConstants['primary-hsl'][360]} / 1)`,
    '600': `hsl(${paletteConstants['primary-hsl'][600]} / 1)`,
    '630': `hsl(${paletteConstants['primary-hsl'][630]} / 1)`,
    '700': `hsl(${paletteConstants['primary-hsl'][700]} / 1)`,
    '730': `hsl(${paletteConstants['primary-hsl'][730]} / 1)`
  },
  red: {
    '400': `hsl(${paletteConstants['red-hsl'][400]} / 1)`
  },
  white: {
    base: `hsl(${paletteConstants['white-hsl'].base} / 1)`
  }
};
declare module '@mui/material/styles' {
  interface Theme {
    dcPalette: {
      background: {
        modifierAccent: string;
        modifierHover: string;
        modifierSelected: string;
        primary: string;
        secondary: string;
        tertiary: string;
      };
      button: {
        secondaryBackground: string;
      };
      green: {
        '330': string;
        '360': string;
        '430': string;
      };
      header: {
        primary: string;
      };
      interactive: {
        active: string;
        normal: string;
      };
      primary: {
        '100': string;
        '330': string;
        '360': string;
        '630': string;
        '730': string;
      };
      status: {
        danger: {
          base: string;
        };
        positive: {
          background: string;
          text: string;
        };
      };
      text: {
        link: string;
        muted: string;
        normal: string;
        positive: string;
      };
      white: {
        base: string;
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
        sidebar: string;
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
      background: {
        modifierAccent: string;
        modifierHover: string;
        modifierSelected: string;
        primary: string;
        secondary: string;
        tertiary: string;
      };
      button: {
        secondaryBackground: string;
      };
      green: {
        '330': string;
        '360': string;
        '430': string;
      };
      header: {
        primary: string;
      };
      interactive: {
        active: string;
        normal: string;
      };
      primary: {
        '100': string;
        '330': string;
        '360': string;
        '630': string;
        '730': string;
      };
      status: {
        danger: {
          base: string;
        };
        positive: {
          background: string;
          text: string;
        };
      };
      text: {
        link: string;
        muted: string;
        normal: string;
        positive: string;
      };
      white: {
        base: string;
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
        sidebar: string;
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
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true
      }
    }
  },
  dcPalette: {
    background: {
      modifierAccent: `color-mix(in oklab, hsl(${paletteConstants['primary-hsl'][500]} / 0.48) 100%, hsl(0 0% 0% / 0.48) 0%)`,
      modifierHover: `color-mix(in oklab, hsl(${paletteConstants['primary-hsl'][500]} / 0.3) 100%, hsl(0 0% 0% / 0.3) 0%)`,
      modifierSelected: `color-mix(in oklab, hsl(${paletteConstants['primary-hsl'][500]} / 0.6) 100%, hsl(0 0% 0% / 0.6) 0%)`,
      primary: `color-mix(in oklab, ${paletteConstants.primary[600]} 100%, black 0%)`,
      secondary: `color-mix(in oklab, ${paletteConstants.primary[630]} 100%, black 0%)`,
      tertiary: `color-mix(in oklab, ${paletteConstants.primary[700]} 100%, black 0%)`
    },
    button: {
      secondaryBackground: 'rgb(78, 80, 88)'
    },
    green: {
      '330': paletteConstants.green[330],
      '360': paletteConstants.green[360],
      '430': paletteConstants.green[430]
    },
    header: {
      primary: `color-mix(in oklab, ${paletteConstants.primary[130]} 100%, black 0%)`
    },
    interactive: {
      active: `color-mix(in oklab, ${paletteConstants.white.base} 100%, black 0%)`,
      normal: `color-mix(in oklab, ${paletteConstants.primary[330]} 100%, black 0%)`
    },
    primary: {
      '100': paletteConstants.primary[100],
      '330': paletteConstants.primary[330],
      '360': paletteConstants.primary[360],
      '630': paletteConstants.primary[630],
      '730': paletteConstants.primary[730]
    },
    status: {
      danger: {
        base: paletteConstants.red[400]
      },
      positive: {
        background: paletteConstants.green[430],
        text: paletteConstants.white.base
      }
    },
    text: {
      link: `color-mix(in oklab, ${paletteConstants.blue[345]} 100%, black 0%)`,
      muted: `color-mix(in oklab, ${paletteConstants.primary[360]} 100%, black 0%)`,
      normal: 'rgb(219, 222, 225)',
      positive: `color-mix(in oklab, ${paletteConstants.green[330]} 100%, black 0%)`
    },
    white: {
      base: paletteConstants.white.base
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
      modal: '440px',
      sidebar: '240px'
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
              color: defaultTheme.dcPalette.text.muted,
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
