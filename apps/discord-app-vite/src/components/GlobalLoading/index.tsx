import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import loadingIconMp4Vid from './assets/loading_icon.mp4';
import loadingIconWebmVid from './assets/loading_icon.webm';
import loadingIconImg from './assets/loading_icon.png';

const GlobalLoading = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.dcPalette.background.secondary,
        zIndex: 3000
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <video
          autoPlay
          loop
          muted
          style={{ width: '200px', height: '200px' }}
        >
          <source
            src={loadingIconWebmVid}
            type='video/webm'
          />
          <source
            src={loadingIconMp4Vid}
            type='video/mp4'
          />
          <img
            alt=''
            src={loadingIconImg}
          />
        </video>
        <Box sx={{ position: 'relative', top: '-20px' }}>
          <Typography
            sx={{
              maxWidth: '300px',
              color: theme.dcPalette.header.primary,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              lineHeight: '16px',
              marginBottom: theme.spacing(1)
            }}
          >
            Did you know
          </Typography>
          <Typography
            sx={{
              maxWidth: '300px',
              color: theme.dcPalette.text.normal,
              fontSize: '1rem',
              lineHeight: '20px'
            }}
          >
            Insert random fact here
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GlobalLoading;
