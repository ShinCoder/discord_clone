import { Box } from '@mui/material';

import NavItemDM from './components/NavItemDM';
import NavItemAdd from './components/NavItemAdd';
import NavItemDiscoverable from './components/NavItemDiscoverable';
import NavItemDownload from './components/NavItemDownload';
import CustomDivider from '@elements/CustomDivider';

const ServerNavigator = () => {
  return (
    <Box
      component='nav'
      sx={{
        width: '72px',
        height: '100%',
        backgroundColor: (theme) => theme.dcPalette.background.tertiary
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
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
        <NavItemDM />
        <CustomDivider
          sx={{
            height: '2px',
            width: '32px',
            marginBottom: (theme) => theme.spacing(1)
          }}
        />
        <Box></Box>
        <NavItemAdd />
        <NavItemDiscoverable />
        <CustomDivider
          sx={{
            height: '2px',
            width: '32px',
            marginBottom: (theme) => theme.spacing(1)
          }}
        />
        <NavItemDownload />
      </Box>
    </Box>
  );
};

export default ServerNavigator;
