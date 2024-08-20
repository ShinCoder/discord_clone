import { useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import { NavItemAvatar } from '../../elements';

const NavItemAdd = () => {
  const [active, setActive] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: (theme) => theme.spacing(1)
      }}
    >
      <Tooltip
        title='Add a Server'
        placement='right'
      >
        <NavItemAvatar
          color={theme.dcPalette.green[360]}
          active={active}
          selectedBackgroundColor={theme.dcPalette.green[360]}
        >
          <AddIcon />
        </NavItemAvatar>
      </Tooltip>
      <Box
        sx={{
          width: '8px',
          height: '48px',
          position: 'absolute',
          left: 0,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          className='nav-item-pill'
          component='span'
          sx={{
            width: '8px',
            height: '40px',
            borderRadius: '0 4px 4px 0',
            marginLeft: (theme) => `-${theme.spacing(0.5)}`,
            backgroundColor: (theme) => theme.dcPalette.header.primary,
            transition: 'all 0.3s ease-out',
            transformOrigin: 'center center',
            scale: 0
          }}
        />
      </Box>
    </Box>
  );
};

export default NavItemAdd;
