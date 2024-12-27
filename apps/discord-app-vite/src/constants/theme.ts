import { ThemeOptions, createTheme } from '@mui/material/styles';

const placeholderColor = 'hsl(0, 100%, 100%)';

interface PaletteConstants {
  saturationFactor: number;

  'blue-hsl': {
    '345': string;
  };
  'brand-hsl': {
    '500': string;
    '560': string;
  };
  'green-hsl': {
    '330': string;
    '360': string;
    '430': string;
  };
  'primary-hsl': {
    '100': string;
    '130': string;
    '230': string;
    '330': string;
    '360': string;
    '430': string;
    '500': string;
    '530': string;
    '560': string;
    '600': string;
    '630': string;
    '700': string;
    '730': string;
    '800': string;
  };
  'red-hsl': {
    '345': string;
    '400': string;
    '430': string;
  };
  'white-hsl': {
    base: string;
    '500': string;
  };

  blue: {
    '345': string;
  };
  brand: {
    '500': string;
    '560': string;
  };
  green: {
    '330': string;
    '360': string;
    '430': string;
  };
  primary: {
    '100': string;
    '130': string;
    '230': string;
    '330': string;
    '360': string;
    '430': string;
    '530': string;
    '500': string;
    '560': string;
    '600': string;
    '630': string;
    '700': string;
    '730': string;
    '800': string;
  };
  red: {
    '345': string;
    '400': string;
    '430': string;
  };
  white: {
    base: string;
    '500': string;
  };
}

let paletteConstants: PaletteConstants = {
  saturationFactor: 1,

  'blue-hsl': {
    '345': placeholderColor
  },
  'brand-hsl': {
    '500': placeholderColor,
    '560': placeholderColor
  },
  'green-hsl': {
    '330': placeholderColor,
    '360': placeholderColor,
    '430': placeholderColor
  },
  'primary-hsl': {
    '100': placeholderColor,
    '130': placeholderColor,
    '230': placeholderColor,
    '330': placeholderColor,
    '360': placeholderColor,
    '430': placeholderColor,
    '500': placeholderColor,
    '530': placeholderColor,
    '560': placeholderColor,
    '600': placeholderColor,
    '630': placeholderColor,
    '700': placeholderColor,
    '730': placeholderColor,
    '800': placeholderColor
  },
  'red-hsl': {
    '345': placeholderColor,
    '400': placeholderColor,
    '430': placeholderColor
  },
  'white-hsl': {
    base: placeholderColor,
    '500': placeholderColor
  },

  blue: {
    '345': placeholderColor
  },
  brand: {
    '500': placeholderColor,
    '560': placeholderColor
  },
  green: {
    '330': placeholderColor,
    '360': placeholderColor,
    '430': placeholderColor
  },
  primary: {
    '100': placeholderColor,
    '130': placeholderColor,
    '230': placeholderColor,
    '330': placeholderColor,
    '360': placeholderColor,
    '430': placeholderColor,
    '500': placeholderColor,
    '530': placeholderColor,
    '560': placeholderColor,
    '600': placeholderColor,
    '630': placeholderColor,
    '700': placeholderColor,
    '730': placeholderColor,
    '800': placeholderColor
  },
  red: {
    '345': placeholderColor,
    '400': placeholderColor,
    '430': placeholderColor
  },
  white: {
    base: placeholderColor,
    '500': placeholderColor
  }
};

paletteConstants = {
  ...paletteConstants,

  'blue-hsl': {
    '345': `201 calc(${paletteConstants.saturationFactor} * 100%) 59%`
  },
  'brand-hsl': {
    '500': `234.935 calc(${paletteConstants.saturationFactor} * 85.556%) 64.706%`,
    '560': `234.72 calc(${paletteConstants.saturationFactor} * 51.44%) 52.353%`
  },
  'green-hsl': {
    '330': `146 calc(${paletteConstants.saturationFactor} * 63.1%) 47.8%`,
    '360': `145 calc(${paletteConstants.saturationFactor} * 65%) 39.2%`,
    '430': `142 calc(${paletteConstants.saturationFactor} * 56.1%) 32.2%`
  },
  'primary-hsl': {
    '100': `0 calc(${paletteConstants.saturationFactor} * 0%) 97.6%`,
    '130': `220 calc(${paletteConstants.saturationFactor} * 13%) 95.5%`,
    '230': `210 calc(${paletteConstants.saturationFactor} * 9.091%) 87.059%`,
    '330': `215 calc(${paletteConstants.saturationFactor} * 8.8%) 73.3%`,
    '360': `214 calc(${paletteConstants.saturationFactor} * 8.1%) 61.2%`,
    '430': `229.091 calc(${paletteConstants.saturationFactor} * 4.803%) 44.902%`,
    '500': `228 calc(${paletteConstants.saturationFactor} * 6%) 32.5%`,
    '530': `226.667 calc(${paletteConstants.saturationFactor} * 6.475%) 27.255%`,
    '560': `225 calc(${paletteConstants.saturationFactor} * 6.667%) 23.529%`,
    '600': `223 calc(${paletteConstants.saturationFactor} * 6.7%) 20.6%`,
    '630': `220 calc(${paletteConstants.saturationFactor} * 6.5%) 18%`,
    '700': `225 calc(${paletteConstants.saturationFactor} * 6.3%) 12.5%`,
    '730': `225 calc(${paletteConstants.saturationFactor} * 7.1%) 11%`,
    '800': `220 calc(${paletteConstants.saturationFactor} * 8.108%) 7.255%`
  },
  'red-hsl': {
    '345': `358.168 calc(${paletteConstants.saturationFactor} * 92.908%) 72.353%`,
    '400': `359 calc(${paletteConstants.saturationFactor} * 87.3%) 59.8%`,
    '430': `358.16 calc(${paletteConstants.saturationFactor} * 63.776%) 53.529%`
  },
  'white-hsl': {
    base: `0 calc(${paletteConstants.saturationFactor} * 0%) 100%`,
    '500': `0 calc(${paletteConstants.saturationFactor} * 0%) 100%`
  }
};

paletteConstants = {
  ...paletteConstants,

  blue: {
    '345': `hsl(${paletteConstants['blue-hsl'][345]} / 1)`
  },
  brand: {
    '500': `hsl(${paletteConstants['brand-hsl'][500]} / 1)`,
    '560': `hsl(${paletteConstants['brand-hsl'][560]} / 1)`
  },
  green: {
    '330': `hsl(${paletteConstants['green-hsl'][330]} / 1)`,
    '360': `hsl(${paletteConstants['green-hsl'][360]} / 1)`,
    '430': `hsl(${paletteConstants['green-hsl'][430]} / 1)`
  },
  primary: {
    '100': `hsl(${paletteConstants['primary-hsl'][100]} / 1)`,
    '130': `hsl(${paletteConstants['primary-hsl'][130]} / 1)`,
    '230': `hsl(${paletteConstants['primary-hsl'][230]} / 1)`,
    '330': `hsl(${paletteConstants['primary-hsl'][330]} / 1)`,
    '360': `hsl(${paletteConstants['primary-hsl'][360]} / 1)`,
    '430': `hsl(${paletteConstants['primary-hsl'][430]} / 1)`,
    '500': `hsl(${paletteConstants['primary-hsl'][500]} / 1)`,
    '530': `hsl(${paletteConstants['primary-hsl'][530]} / 1)`,
    '560': `hsl(${paletteConstants['primary-hsl'][560]} / 1)`,
    '600': `hsl(${paletteConstants['primary-hsl'][600]} / 1)`,
    '630': `hsl(${paletteConstants['primary-hsl'][630]} / 1)`,
    '700': `hsl(${paletteConstants['primary-hsl'][700]} / 1)`,
    '730': `hsl(${paletteConstants['primary-hsl'][730]} / 1)`,
    '800': `hsl(${paletteConstants['primary-hsl'][800]} / 1)`
  },
  red: {
    '345': `hsl(${paletteConstants['red-hsl'][345]} / 1)`,
    '400': `hsl(${paletteConstants['red-hsl'][400]} / 1)`,
    '430': `hsl(${paletteConstants['red-hsl'][430]} / 1)`
  },
  white: {
    base: `hsl(${paletteConstants['white-hsl'].base} / 1)`,
    '500': `hsl(${paletteConstants['white-hsl'][500]} / 1)`
  }
};
declare module '@mui/material/styles' {
  interface Theme {
    dcPalette: {
      background: {
        accent: string;
        floating: string;
        messageHover: string;
        modFaint: string;
        modifierAccent: string;
        modifierHover: string;
        modifierSelected: string;
        primary: string;
        secondary: string;
        tertiary: string;
      };
      brand: {
        '500': string;
      };
      button: {
        filledBrandBackground: string;
        filledBrandBackgroundHover: string;
        filledBrandText: string;
        secondaryBackground: string;
        secondaryBackgroundDisabled: string;
        secondaryBackgroundHover: string;
        secondaryText: string;
      };
      channel: {
        textareaBackground: string;
      };
      green: {
        '330': string;
        '360': string;
        '430': string;
      };
      header: {
        primary: string;
        secondary: string;
      };
      info: {
        danger: {
          foreground: string;
        };
        positive: {
          foreground: string;
        };
      };
      interactive: {
        active: string;
        hover: string;
        normal: string;
      };
      menuItem: {
        dangerHoverBg: string;
      };
      primary: {
        '100': string;
        '330': string;
        '360': string;
        '600': string;
        '630': string;
        '730': string;
        '800': string;
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
        danger: string;
        link: string;
        muted: string;
        normal: string;
        positive: string;
      };
      white: {
        base: string;
        '500': string;
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
      maxHeight: {
        customChannelTextArea: string;
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
        accent: string;
        floating: string;
        messageHover: string;
        modFaint: string;
        modifierAccent: string;
        modifierHover: string;
        modifierSelected: string;
        primary: string;
        secondary: string;
        tertiary: string;
      };
      brand: {
        '500': string;
      };
      button: {
        filledBrandBackground: string;
        filledBrandBackgroundHover: string;
        filledBrandText: string;
        secondaryBackground: string;
        secondaryBackgroundDisabled: string;
        secondaryBackgroundHover: string;
        secondaryText: string;
      };
      channel: {
        textareaBackground: string;
      };
      green: {
        '330': string;
        '360': string;
        '430': string;
      };
      header: {
        primary: string;
        secondary: string;
      };
      info: {
        danger: {
          foreground: string;
        };
        positive: {
          foreground: string;
        };
      };
      interactive: {
        active: string;
        hover: string;
        normal: string;
      };
      menuItem: {
        dangerHoverBg: string;
      };
      primary: {
        '100': string;
        '330': string;
        '360': string;
        '600': string;
        '630': string;
        '730': string;
        '800': string;
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
        danger: string;
        link: string;
        muted: string;
        normal: string;
        positive: string;
      };
      white: {
        base: string;
        '500': string;
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
      maxHeight: {
        customChannelTextArea: string;
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
      accent: `color-mix(in oklab, ${paletteConstants.primary[530]} 100%, black 0%)`,
      floating: `color-mix(in oklab, ${paletteConstants.primary[800]} 100%, black 0%)`,
      messageHover:
        'color-mix(in oklab, hsl(0 calc(1 * 0%) 0.784% / 0.06) 100%, hsl(0 0% 0% / 0.06) 0%)',
      modFaint:
        'color-mix(in oklab, hsl(228 calc(1 * 6.024%) 32.549% / 0.3) 100%, hsl(0 0% 0% / 0.3) 0%)',
      modifierAccent: `color-mix(in oklab, hsl(${paletteConstants['primary-hsl'][500]} / 0.48) 100%, hsl(0 0% 0% / 0.48) 0%)`,
      modifierHover: `color-mix(in oklab, hsl(${paletteConstants['primary-hsl'][500]} / 0.3) 100%, hsl(0 0% 0% / 0.3) 0%)`,
      modifierSelected: `color-mix(in oklab, hsl(${paletteConstants['primary-hsl'][500]} / 0.6) 100%, hsl(0 0% 0% / 0.6) 0%)`,
      primary: `color-mix(in oklab, ${paletteConstants.primary[600]} 100%, black 0%)`,
      secondary: `color-mix(in oklab, ${paletteConstants.primary[630]} 100%, black 0%)`,
      tertiary: `color-mix(in oklab, ${paletteConstants.primary[700]} 100%, black 0%)`
    },
    brand: {
      '500': paletteConstants.brand[500]
    },
    button: {
      filledBrandBackground: paletteConstants.brand[500],
      filledBrandBackgroundHover: paletteConstants.brand[560],
      filledBrandText: paletteConstants.white.base,
      secondaryBackground: paletteConstants.primary[500],
      secondaryBackgroundDisabled: paletteConstants.primary[500],
      secondaryBackgroundHover: paletteConstants.primary[430],
      secondaryText: paletteConstants.white[500]
    },
    channel: {
      textareaBackground: `color-mix(in oklab, ${paletteConstants.primary[560]} 100%, black 0%)`
    },
    green: {
      '330': paletteConstants.green[330],
      '360': paletteConstants.green[360],
      '430': paletteConstants.green[430]
    },
    header: {
      primary: `color-mix(in oklab, ${paletteConstants.primary[130]} 100%, black 0%)`,
      secondary: `color-mix(in oklab, ${paletteConstants.primary[330]} 100%, black 0%)`
    },
    info: {
      danger: {
        foreground: `color-mix(in oklab, ${paletteConstants.red[400]} 100%, black 0%)`
      },
      positive: {
        foreground: `color-mix(in oklab, ${paletteConstants.green[360]} 100%, black 0%)`
      }
    },
    interactive: {
      active: `color-mix(in oklab, ${paletteConstants.white.base} 100%, black 0%)`,
      hover: `color-mix(in oklab, ${paletteConstants.primary[230]} 100%, black 0%)`,
      normal: `color-mix(in oklab, ${paletteConstants.primary[330]} 100%, black 0%)`
    },
    menuItem: {
      dangerHoverBg: `color-mix(in oklab, ${paletteConstants.red[430]} 100%, black 0%)`
    },
    primary: {
      '100': paletteConstants.primary[100],
      '330': paletteConstants.primary[330],
      '360': paletteConstants.primary[360],
      '600': paletteConstants.primary[600],
      '630': paletteConstants.primary[630],
      '730': paletteConstants.primary[730],
      '800': paletteConstants.primary[800]
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
      danger: `color-mix(in oklab, ${paletteConstants.red[345]} 100%, black 0%)`,
      link: `color-mix(in oklab, ${paletteConstants.blue[345]} 100%, black 0%)`,
      muted: `color-mix(in oklab, ${paletteConstants.primary[360]} 100%, black 0%)`,
      normal: 'rgb(219, 222, 225)',
      positive: `color-mix(in oklab, ${paletteConstants.green[330]} 100%, black 0%)`
    },
    white: {
      base: paletteConstants.white.base,
      '500': paletteConstants.white[500]
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
    maxHeight: {
      customChannelTextArea: '50vh'
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
