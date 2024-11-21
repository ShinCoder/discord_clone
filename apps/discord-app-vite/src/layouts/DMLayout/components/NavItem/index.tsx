import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ellipsisTextWrapStyle } from '@utils';

interface NavItemProps {
  href: string;
  label: string;
  startAdornment?: ReactNode;
}

const NavItem = (props: NavItemProps) => {
  const { href, label, startAdornment } = props;
  const theme = useTheme();

  return (
    <Box sx={{ padding: `${theme.spacing(0.125)} 0` }}>
      <NavLink to={href}>
        {({ isActive }) => (
          <Button
            disableElevation
            type='button'
            sx={{
              width: '100%',
              height: '42px',
              justifyContent: 'flex-start',
              color: isActive
                ? theme.dcPalette.interactive.active
                : theme.dcPalette.text.muted,
              textTransform: 'none',
              padding: `0 ${theme.spacing(1)}`,
              backgroundColor: isActive
                ? theme.dcPalette.background.modifierSelected
                : 'transparent',
              transition: 'all 0.3s',

              '&:hover': {
                color: theme.dcPalette.text.normal,
                backgroundColor: theme.dcPalette.background.modifierHover
              }
            }}
            startIcon={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '32px',
                  height: '32px',
                  marginRight: theme.spacing(1.5)
                }}
              >
                {startAdornment}
              </Box>
            }
          >
            <Typography
              sx={{
                color: 'inherit',
                fontSize: '1rem',
                fontWeight: 500,

                lineHeight: '20px',

                ...{ ellipsisTextWrapStyle }
              }}
            >
              {label}
            </Typography>
          </Button>
        )}
      </NavLink>
    </Box>
  );
};

export default NavItem;
