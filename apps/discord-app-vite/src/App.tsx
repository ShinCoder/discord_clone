import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import GlobalBackdrop from '@components/GlobalBackdrop';
import { defaultTheme } from '@constants';
import AppRouter from './AppRouter';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <GlobalBackdrop />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
