import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import UserAvatar from '@components/UserAvatar';

import { AccountDto, RelationshipStatus } from '@prj/types/api';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface RequestItemProps {
  data: AccountDto;
  onAccept: () => void;
  onDecline: () => void;
}

const RequestItem = (props: RequestItemProps) => {
  const { data, onAccept, onDecline } = props;

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '62px',
        borderTop: `1px solid ${theme.dcPalette.background.modifierAccent}`,
        borderBottom: '1px solid transparent',
        margin: '0 20px 0 30px',
        cursor: 'pointer',

        '&:hover': {
          padding: '16px 10px',
          borderColor: 'transparent',
          borderRadius: '8px',
          margin: '0 10px 0 20px',
          backgroundColor: theme.dcPalette.background.modifierHover,

          '& .hidden-username': {
            visibility: 'visible'
          },

          '& .action-button': {
            backgroundColor: theme.dcPalette.background.tertiary
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '12px' }}>
        <UserAvatar
          src={data.avatar}
          alt={data.username}
          color={data.bannerColor}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='span'
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: theme.dcPalette.header.primary
              }}
            >
              {data.displayName || data.username}
            </Typography>
            <Typography
              component='span'
              sx={{
                fontSize: '0/875rem',
                color: theme.dcPalette.header.secondary,
                marginLeft: '5px',
                visibility: 'hidden'
              }}
              className='hidden-username'
            >
              {data.username}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: theme.dcPalette.header.secondary,
              textTransform: 'capitalize'
            }}
          >
            {data.connectionStatus?.toLowerCase() || 'Offline'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', columnGap: '10px' }}>
        {data.relationshipWith?.status === RelationshipStatus.REQUESTING && (
          <Tooltip
            title='Accept'
            placement='top'
          >
            <IconButton
              sx={{
                width: '36px',
                height: '36px',
                color: theme.dcPalette.interactive.normal,
                backgroundColor: theme.dcPalette.background.secondary,

                '&:hover': {
                  color: theme.dcPalette.info.positive.foreground,
                  backgroundColor: theme.dcPalette.background.secondary
                }
              }}
              className='action-button'
              onClick={onAccept}
            >
              <CheckIcon sx={{ width: '20px', height: '20px' }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          title={
            data.relationshipWith?.status === RelationshipStatus.PENDING
              ? 'Cancel'
              : 'Ignore'
          }
          placement='top'
        >
          <IconButton
            sx={{
              width: '36px',
              height: '36px',
              color: theme.dcPalette.interactive.normal,
              backgroundColor: theme.dcPalette.background.secondary,

              '&:hover': {
                color: theme.dcPalette.info.danger.foreground,
                backgroundColor: theme.dcPalette.background.secondary
              }
            }}
            className='action-button'
            onClick={onDecline}
          >
            <CloseIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default memo(RequestItem);