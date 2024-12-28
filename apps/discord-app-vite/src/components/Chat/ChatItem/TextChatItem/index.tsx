import { memo } from 'react';
import { Box, Typography } from '@mui/material';

import { ProcessedMessage } from '@utils';

interface TextChatItemProps {
  data: ProcessedMessage;
  variant?: 'normal' | 'error';
}

const TextChatItem = (props: TextChatItemProps) => {
  const { data, variant = 'normal' } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '2px 48px 2px 0',

        '&:hover': {
          backgroundColor: (theme) => theme.dcPalette.background.messageHover,

          '.message-time': { opacity: 1 }
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '56px',
          opacity: 0
        }}
        className='message-time'
      >
        <Typography
          sx={{
            color: (theme) => theme.dcPalette.text.muted,
            fontSize: '0.6875rem',
            lineHeight: '22px',
            marginRight: '4px'
          }}
        >
          {data.createdAt.format('h:mm A')}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            display: 'block',
            color: (theme) =>
              variant === 'normal'
                ? theme.dcPalette.text.normal
                : theme.dcPalette.status.danger.base,
            fontSize: '1rem',
            fontWeight: 400,
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

export default memo(TextChatItem);
