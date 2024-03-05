import Box from '@mui/material/Box';
import NavItem from './components/NavItem';
import { protectedRoutes } from '@constants';

const ServerNavigator = () => {
  return (
    <Box
      component='nav'
      sx={{ width: '72px', height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '12px',
          overflow: 'hidden scroll',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            width: 0,
            height: 0
          }
        }}
      >
        <NavItem
          href={protectedRoutes.myChannels}
          tooltip='Direct Messages'
        />
      </Box>
    </Box>
  );
};

export default ServerNavigator;
