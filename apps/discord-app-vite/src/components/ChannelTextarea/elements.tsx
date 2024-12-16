import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ActionIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.dcPalette.interactive.normal,
  padding: '4px',
  margin: '0 4px',
  cursor: 'pointer',

  '&:hover': {
    color: theme.dcPalette.interactive.hover
  }
}));
