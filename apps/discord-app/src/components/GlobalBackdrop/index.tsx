'use client';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';

import { useAppSelector } from '@redux/hooks';

function GlobalBackdrop() {
  const disableTabKey = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  };

  const statusState = useAppSelector((state) => state.status);

  useEffect(() => {
    if (statusState.isLoading)
      document.addEventListener('keydown', disableTabKey);

    return () => {
      document.removeEventListener('keydown', disableTabKey);
    };
  }, [statusState.isLoading]);

  return (
    <Backdrop
      open={statusState.isLoading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color='primary' />
    </Backdrop>
  );
}

export default GlobalBackdrop;
