import { memo, useCallback, MouseEvent } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import UserAvatar from '@components/UserAvatar';
import { useAppDispatch } from '@redux/hooks';
import { showModal } from '@redux/slices/modalSlice';
import { ModalKey } from '@constants';

import { AccountDto } from '@prj/types/api';
import { ProfileModalExtraProps } from '@components/GlobalModal/ProfileModal';

interface IncomingRequestItemProps {
  data: AccountDto;
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingRequestItem = (props: IncomingRequestItemProps) => {
  const { data, onAccept, onDecline } = props;

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleAccept = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onAccept();
    },
    [onAccept]
  );

  const handleDecline = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDecline();
    },
    [onDecline]
  );

  const handleClick = useCallback(() => {
    dispatch(
      showModal({
        key: ModalKey.PROFILE,
        extraProps: {
          profile: data,
          onAcceptFriend: onAccept,
          onIgnoreFriend: onDecline
        }
      } satisfies { key: string; extraProps: ProfileModalExtraProps })
    );
  }, [data, dispatch, onAccept, onDecline]);

  return (
    <Box
      onClick={handleClick}
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
        <Box
          sx={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}
        >
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
                fontSize: '0.875rem',
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
            Incoming Friend Request
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', columnGap: '10px' }}>
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
            onClick={handleAccept}
          >
            <CheckIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title='Ignore'
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
            onClick={handleDecline}
          >
            <CloseIcon sx={{ width: '20px', height: '20px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default memo(IncomingRequestItem);
