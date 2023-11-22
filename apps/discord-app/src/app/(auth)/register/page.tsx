'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Register = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '480px',
        padding: theme.spacing(4),
        borderRadius: theme.dcShape.borderRadius.panel,
        backgroundColor: 'background.default'
      }}
    >
      <Typography
        variant='h1'
        color='text.primary'
        textAlign='center'
      >
        Create an account
      </Typography>
      <Box
        component='form'
        sx={{ marginTop: theme.spacing(1.25) }}
      ></Box>
    </Box>
  );
};

export default Register;
