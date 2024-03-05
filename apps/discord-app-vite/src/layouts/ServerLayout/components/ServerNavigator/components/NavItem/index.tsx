import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import Box from '@mui/material/Box';

type NavItemProps = {
  href: string;
  tooltip: string;
  type?: 'icon' | 'no-icon' | 'main';
  icon?: string;
  color?: string;
  shortenName?: string;
};

const NavItem = (props: NavItemProps) => {
  const { href, tooltip, type = 'main', icon, color, shortenName } = props;
  const match = useMatch(props.href);

  console.log(match);
  const hover = useState<boolean>(false);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    ></Box>
  );
};

export default NavItem;
