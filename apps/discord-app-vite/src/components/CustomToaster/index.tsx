import { useTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
  const theme = useTheme();

  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        success: {
          style: {
            color: theme.palette.common.white,
            fontSize: '1rem',
            backgroundColor: theme.palette.success.main
          },
          iconTheme: {
            primary: theme.palette.common.white,
            secondary: theme.palette.success.main
          }
        },
        error: {
          style: {
            color: theme.palette.common.white,
            fontSize: '1rem',
            backgroundColor: theme.dcPalette.status.danger
          },
          iconTheme: {
            primary: theme.palette.common.white,
            secondary: theme.dcPalette.status.danger
          },
          duration: 4000
        }
      }}
    />
  );
};

export default CustomToaster;
