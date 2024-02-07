import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
        backgroundColor: 'primary.main'
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
