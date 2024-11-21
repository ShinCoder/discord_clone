import { useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import { useAppSelector } from '@redux/hooks';

const GlobalLoadingState = () => {
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
};

export default GlobalLoadingState;
