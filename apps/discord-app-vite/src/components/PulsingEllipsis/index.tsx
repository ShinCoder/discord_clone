import { memo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PulsingDot = styled(Box)(({ theme }) => ({
  width: '6px',
  height: '6px',
  display: 'inline-block',
  borderRadius: '3px',
  backgroundColor: theme.dcPalette.primary[100],
  animation: 'pulse 1.4s infinite ease-in-out',

  '&:nth-of-type(2)': {
    animationDelay: '0.2s'
  },

  '&:nth-of-type(3)': {
    animationDelay: '0.4s'
  }
}));

const PulsingEllipsis = () => {
  return (
    <Box
      sx={{
        '@keyframes pulse': {
          '0%': {
            transform: 'scale(1)',
            opacity: 1
          },
          '50%': {
            transform: 'scale(0.8)',
            opacity: 0.3
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 1
          }
        },
        display: 'inline-flex',
        columnGap: '2px'
      }}
    >
      <PulsingDot />
      <PulsingDot />
      <PulsingDot />
    </Box>
  );
};

export default memo(PulsingEllipsis);
