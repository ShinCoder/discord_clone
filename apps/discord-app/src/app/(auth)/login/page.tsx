'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import VerticalSeperator from '@components/VerticalSeperator';
import { publicRoutes } from '@constants';
import MainLoginForm from './components/MainLoginForm';
import QRSection from './components/QRSection';
import QRCode from './components/QRCode';
import { RegisterLink } from './elements';

const Login = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '784px',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(4),
        borderRadius: theme.dcShape.borderRadius.panel,
        backgroundColor: 'background.default'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            variant='h1'
            color='text.primary'
          >
            Welcome back!
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
          >
            {"We're so excited to see you again!"}
          </Typography>
        </Box>
        <MainLoginForm />
        <Box sx={{ marginTop: theme.spacing(0.5) }}>
          <Typography
            component='span'
            sx={{
              color: theme.dcPalette.text.grey,
              fontSize: '0.875rem',
              lineHeight: '1rem'
            }}
          >
            Need an account?{' '}
          </Typography>
          <RegisterLink href={publicRoutes.register}>Register</RegisterLink>
        </Box>
      </Box>
      <VerticalSeperator radius={theme.spacing(4)} />
      <QRSection>
        <QRCode />
      </QRSection>
    </Box>
  );
};

export default Login;
