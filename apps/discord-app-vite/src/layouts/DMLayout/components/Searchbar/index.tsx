import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ellipsisTextWrapStyle } from '@utils';

const Searchbar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        height: theme.dcShape.defaultHeight.header,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing(1.25)}`,
        boxShadow: theme.dcShape.boxShadow.elevationLow
      }}
    >
      <Button
        type='button'
        sx={{
          width: '100%',
          height: '28px',
          justifyContent: 'flex-start',
          color: theme.dcPalette.text.muted,
          fontSize: '0.875rem',
          fontWeight: 500,
          textAlign: 'left',
          textTransform: 'none',

          lineHeight: '24px',
          padding: `${theme.spacing(0.125)} ${theme.spacing(0.75)}`,
          borderRadius: '4px',
          backgroundColor: theme.dcPalette.background.tertiary,

          ...ellipsisTextWrapStyle
        }}
      >
        Find or start a conversation
      </Button>
    </Box>
  );
};

export default Searchbar;
