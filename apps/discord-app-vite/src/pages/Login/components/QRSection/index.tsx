import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const QRSection = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '240px',
        height: '344px',
        display: {
          xs: 'none',
          md: 'block'
        }
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            width: '176px',
            height: '176px',
            marginBottom: theme.spacing(4)
          }}
        >
          {children}
        </Box>
        <Typography
          variant='h1'
          component='h2'
          sx={{ marginBottom: theme.spacing(1) }}
        >
          Log in with QR Code
        </Typography>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          sx={{ textAlign: 'center' }}
        >
          Scan this with the{' '}
          <Typography
            component='strong'
            sx={{ fontWeight: 600 }}
          >
            Discord mobile app
          </Typography>{' '}
          to log in instantly
        </Typography>
      </Box>
    </Box>
  );
};

export default QRSection;
