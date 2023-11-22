/* @jsxImportSource react */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import GlobalBackdrop from '@components/GlobalBackdrop';
import ReduxProvider from '@redux/ReduxProvider';
import ThemeRegistry from './ThemeRegistry';
import ReactQueryProvider from './ReactQueryProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <ReduxProvider>
            <ReactQueryProvider>
              <GlobalBackdrop />
              {children}
            </ReactQueryProvider>
          </ReduxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
