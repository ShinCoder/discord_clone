import { useCallback } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { NavItemAvatar } from '../../elements';
import BrandIcon from '@components/BrandIcon';
import { protectedRoutes } from '@constants';

const NavItemDM = () => {
  const match = useMatch(protectedRoutes.myChannels);
  const navigate = useNavigate();

  const active = match?.pathname === protectedRoutes.myChannels;

  const handleClick = useCallback(() => {
    if (!active) navigate(protectedRoutes.myChannels);
  }, [active, navigate]);

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
        title='Direct Messages'
        placement='right'
      >
        <NavItemAvatar
          active={active}
          onClick={handleClick}
        >
          <BrandIcon />
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

export default NavItemDM;
