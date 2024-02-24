import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import GlobalLoadingState from '@components/GlobalLoadingState';
import CustomToaster from '@components/CustomToaster';
import { defaultTheme } from '@constants';
import AppRouter from './AppRouter';

const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              if (
                error?.data?.message === 'Unauthorized' &&
                error?.data.statusCode === 401
              )
                return false;
              return failureCount > 2 ? false : true;
            }
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <GlobalLoadingState />
        <CustomToaster />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
