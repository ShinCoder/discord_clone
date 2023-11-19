/* @jsxImportSource react */

import { ReactNode } from 'react';
import Box from '@mui/material/Box';

const AuthGroupLayout = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100dvh',
      backgroundColor: 'primary.main'
    }}
  >
    {children}
  </Box>
);

export default AuthGroupLayout;
