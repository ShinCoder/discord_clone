import { memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const MoreButton = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popperOpen = !!anchorEl;

  return (
    <Tooltip
      title='More'
      placement='top'
    >
      <>
        <IconButton
          sx={{
            width: '36px',
            height: '36px',
            color: theme.dcPalette.interactive.normal,
            backgroundColor: theme.dcPalette.background.secondary,

            '&:hover': {
              color: theme.dcPalette.interactive.hover,
              backgroundColor: theme.dcPalette.background.secondary
            }
          }}
          className='action-button'
          onClick={handleClick}
        >
          <MoreVertIcon sx={{ width: '20px', height: '20px' }} />
        </IconButton>
        <Popover
          open={popperOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          slotProps={{
            paper: {
              sx: {
                minWidth: '188px',
                maxWidth: '320px',
                padding: '6px 8px',
                backgroundColor: theme.dcPalette.background.floating
              }
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '32px',
              color: theme.dcPalette.status.danger.base,
              padding: '6px 8px',
              borderRadius: '2px',
              cursor: 'pointer',

              '&:hover': {
                color: theme.dcPalette.white.base,
                backgroundColor: theme.dcPalette.menuItem.dangerHoverBg
              }
            }}
          >
            <Typography
              sx={{
                flex: '1 1 auto',

                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: '18px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              Remove Friend
            </Typography>
          </Box>
        </Popover>
      </>
    </Tooltip>
  );
};

export default memo(MoreButton);
