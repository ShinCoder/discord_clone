import Box from '@mui/material/Box';
import ServerNavigator from './components/ServerNavigator';
import { Outlet } from 'react-router-dom';

const ServerLayout = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100dvh',
        display: 'flex',
        overflow: 'hidden'
      }}
    >
      <ServerNavigator />
      <Outlet />
    </Box>
  );
};

export default ServerLayout;
