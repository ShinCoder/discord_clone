import { ProcessedMessageDate } from '@utils';
import { Box, Divider, Typography } from '@mui/material';
import { memo } from 'react';
import ChatClump from '../ChatClump';

interface ChatDateProps {
  data: ProcessedMessageDate;
}

const ChatDate = (props: ChatDateProps) => {
  const { data } = props;

  return (
    <Box>
      <Divider
        sx={{
          margin: '24px 14px 8px 16px',

          '&::before, &::after': {
            borderColor: (theme) => theme.dcPalette.background.modifierAccent
          },

          '.MuiDivider-wrapper': {
            padding: 0
          }
        }}
      >
        <Typography
          sx={{
            color: (theme) => theme.dcPalette.text.muted,
            fontSize: '0.75rem',
            fontWeight: 600,
            lineHeight: '13px',
            padding: '2px 4px'
          }}
        >
          {data.date.format('MMMM D, YYYY')}
        </Typography>
      </Divider>
      {data.messageClumps.map((e) => (
        <ChatClump
          key={e.messages[0].key}
          data={e}
          variant={e.isError ? 'error' : 'normal'}
        />
      ))}
    </Box>
  );
};

export default memo(ChatDate);
