import { SxProps } from '@mui/material/styles';

export const scrollbarStyle: SxProps = {
  '&::-webkit-scrollbar': {
    width: '8px',
    padding: '0px 2px'
  },

  '&::-webkit-scrollbar-track': {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    backgroundColor: (theme) => theme.dcPalette.background.secondary
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
