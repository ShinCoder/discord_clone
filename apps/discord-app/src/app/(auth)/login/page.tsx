'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import VerticalSeperator from '@components/VerticalSeperator';
import MainLoginForm from './components/MainLoginForm';
import QRSection from './components/QRSection';
import QRCode from './components/QRCode';

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
      <MainLoginForm />
      <VerticalSeperator radius={theme.spacing(4)} />
      <QRSection>
        <QRCode />
      </QRSection>
    </Box>
  );
};

export default Login;
