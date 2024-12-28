import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

import { ProcessedMessage } from '@utils';

import { AccountDto } from '@prj/types/api';
import UserAvatar from '@components/UserAvatar';

dayjs.extend(calendar);

interface HeadTextChatItemProps {
  data: ProcessedMessage;
  sender: AccountDto;
  variant?: 'normal' | 'error';
}

const HeadTextChatItem = (props: HeadTextChatItemProps) => {
  const { data, sender, variant = 'normal' } = props;

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '2px 48px 2px 0',

        '&:hover': {
          backgroundColor: theme.dcPalette.background.messageHover
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '56px'
        }}
      >
        <UserAvatar
          src={sender.avatar}
          color={sender.bannerColor}
          alt={sender.username}
          size='40px'
          showStatus={false}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{ display: 'block', lineHeight: '22px' }}
          component='h3'
        >
          <Typography
            sx={{
              display: 'inline',
              color: theme.dcPalette.header.primary,
              fontSize: '1rem',
              fontWeight: 500,
              marginRight: '4px'
            }}
          >
            {sender.displayName || sender.username}
          </Typography>
          <Typography
            sx={{
              display: 'inline',
              color: theme.dcPalette.text.muted,
              fontSize: '0.75rem',
              marginLeft: '4px'
            }}
          >
            {data.createdAt.calendar(null, {
              sameDay: '[Today at] h:mm A',
              nexDay: 'M/DD/YY, h:mm A',
              nextWeek: 'M/DD/YY, h:mm A',
              lastDay: '[Yesterday at] h:mm A',
              lastWeek: 'M/DD/YY, h:mm A',
              sameElse: 'M/DD/YY, h:mm A'
            })}
          </Typography>
        </Typography>
        <Typography
          sx={{
            display: 'block',
            color:
              variant === 'normal'
                ? theme.dcPalette.text.normal
                : theme.dcPalette.status.danger.base,
            fontSize: '1rem',
            whiteSpace: 'break-spaces',
            wordBreak: 'break-word'
          }}
        >
          {data.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(HeadTextChatItem);
