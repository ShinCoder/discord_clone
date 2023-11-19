/* @jsxImportSource react */

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ThemeRegistry from './ThemeRegistry';
import ReduxProvider from '../redux/ReduxProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        {/* <ReduxProvider> */}
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        {/* </ReduxProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
