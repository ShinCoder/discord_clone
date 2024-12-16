import { SxProps } from '@mui/material/styles';

export const inputScrollbarStyle: SxProps = {
  '&::-webkit-scrollbar': {
    width: '8px',
    padding: '0px 2px'
  },

  '&::-webkit-scrollbar-track': {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    backgroundColor: (theme) => theme.dcPalette.primary[630]
  },

  '&::-webkit-scrollbar-thumb': {
    border: '2px solid transparent',
    borderRadius: '4px',
    backgroundClip: 'padding-box',
    backgroundColor: 'rgb(26, 27, 30)'
  },

  '&::-webkit-scrollbar-track-piece': {
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  }
};

export const getScrollbarStyle: (variant?: 'thin' | 'auto') => SxProps = (
  variant = 'auto'
) => {
  const multiplier = variant === 'auto' ? 4 : 2;
  return {
    // scrollbarWidth: variant,
    // scrollbarColor: (theme) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // `${theme.dcPalette.primary[730]} ${theme.dcPalette.primary[630]}`,

    '&::-webkit-scrollbar': {
      width: `${4 * multiplier}px`,
      height: `${4 * multiplier}px`
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: '40px',
      border: `${1 * multiplier}px solid transparent`,
      borderRadius: `${2 * multiplier}px`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      backgroundColor: (theme) => theme.dcPalette.primary[730],
      backgroundClip: 'padding-box'
    },
    '&::-webkit-scrollbar-track': {
      border: `${1 * multiplier}px solid transparent`,
      borderRadius: `${2 * multiplier}px`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      backgroundColor: (theme) => theme.dcPalette.primary[630],
      backgroundClip: 'padding-box'
    }
  };
};

export const ellipsisTextWrapStyle: SxProps = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};
