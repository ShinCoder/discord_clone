import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import ServerNavigator from './components/ServerNavigator';

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
