import { Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import Searchbar from './components/Searchbar';
import FeatureNav from './components/FeatureNav';
import SectionHeader from './components/SectionHeader';
import DMNav from './components/DMNav';
import { getScrollbarStyle } from '@utils';

const DMLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: theme.dcShape.defaultWidth.sidebar,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.dcPalette.background.secondary
        }}
      >
        <Searchbar />
        <Box
          component='nav'
          sx={{
            flex: 1,
            padding: `${theme.spacing(1)} 0 0 ${theme.spacing(1)}`,
            overflow: 'auto',
            scrollbarGutter: 'stable',
            ...getScrollbarStyle('thin')
          }}
        >
          <FeatureNav />
          <SectionHeader
            label='Direct messages'
            actionButton={
              <Tooltip
                title='Create DM'
                placement='top'
              >
                <AddIcon
                  sx={{
                    wdith: '18px',
                    height: '18px',
                    color: 'inherit',
                    transition: 'inherit',
                    cursor: 'pointer'
                  }}
                />
              </Tooltip>
            }
          />
          <DMNav />
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default DMLayout;
