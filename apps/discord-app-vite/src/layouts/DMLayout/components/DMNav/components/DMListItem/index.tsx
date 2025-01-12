import { memo, useCallback, MouseEvent } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

import UserAvatar from '@components/UserAvatar';

import { AccountDto } from '@prj/types/api';

interface DMListItemProps {
  data: AccountDto;
  onClick: () => void;
  onDelete: () => void;
}

const DMListItem = (props: DMListItemProps) => {
  const { data, onClick, onDelete } = props;
  const theme = useTheme();

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  return (
    <Box
      sx={{
        height: '42px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.dcPalette.channel.default,
        padding: '0 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.3s',

        '&:hover': {
          color: theme.dcPalette.interactive.hover,
          backgroundColor: theme.dcPalette.background.modifierHover,

          '.action-delete': {
            visibility: 'visible'
          }
        }
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '12px',
          color: 'inherit'
        }}
      >
        <UserAvatar
          src={data.avatar}
          alt={data.username}
          color={data.bannerColor}
          showStatus
          status={data.connectionStatus}
        />
        <Typography
          sx={{
            color: 'inherit',
            fontSize: '1rem',
            lineHeight: 500,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {data.displayName || data.username}
        </Typography>
      </Box>
      <IconButton
        sx={{ width: '16px', height: '16px', visibility: 'hidden' }}
        disableRipple
        className='action-delete'
        onClick={handleDelete}
      >
        <CloseIcon
          sx={{
            width: '16px',
            height: '16px',
            color: theme.dcPalette.interactive.hover
          }}
        />
      </IconButton>
    </Box>
  );
};

export default memo(DMListItem);
