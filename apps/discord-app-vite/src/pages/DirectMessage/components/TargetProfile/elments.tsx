import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PrimaryActionBtn = styled(Button)(({ theme }) => ({
  minWidth: '52px',
  height: '24px',
  minHeight: '24px',
  color: theme.dcPalette.button.filledBrandText,
  textTransform: 'none',
  padding: '2px 16px',
  borderRadius: theme.dcShape.borderRadius.button,
  backgroundColor: theme.dcPalette.button.filledBrandBackground,
  trasition: 'background 1s ease, color 1s ease',

  '&:hover': {
    backgroundColor: theme.dcPalette.button.filledBrandBackgroundHover
  },

  '&.Mui-disabled': {
    color: theme.dcPalette.button.filledBrandText,
    backgroundColor: theme.dcPalette.button.filledBrandBackground,
    cursor: 'not-allowed',
    pointerEvents: 'auto',
    opacity: 0.5
  }
}));

export const SecondaryActionBtn = styled(PrimaryActionBtn)(({ theme }) => ({
  color: theme.dcPalette.button.secondaryText,
  backgroundColor: theme.dcPalette.button.secondaryBackground,

  '&:hover': {
    backgroundColor: theme.dcPalette.button.secondaryBackgroundHover
  }
}));
