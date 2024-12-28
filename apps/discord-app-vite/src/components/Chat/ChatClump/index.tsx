import { memo, useCallback } from 'react';
import { Box } from '@mui/material';

import { HeadTextChatItem, TextChatItem } from '../ChatItem';
import { ProcessedMessage, ProcessedMessageClump } from '@utils';

interface ChatClumpProps {
  data: ProcessedMessageClump;
  variant?: 'normal' | 'error';
}

const ChatClump = (props: ChatClumpProps) => {
  const { data, variant = 'normal' } = props;

  const renderItem = useCallback(
    (item: ProcessedMessage) => {
      switch (item.type) {
        default:
          return (
            <TextChatItem
              data={item}
              key={item.key}
              variant={variant}
            />
          );
      }
    },
    [variant]
  );

  const renderHeadItem = useCallback(
    (item: ProcessedMessage) => {
      switch (item.type) {
        default:
          return (
            <HeadTextChatItem
              data={item}
              sender={data.sender}
              variant={variant}
            />
          );
      }
    },
    [data.sender, variant]
  );

  return data.messages.length > 0 ? (
    <Box sx={{ paddingTop: '10px' }}>
      {renderHeadItem(data.messages[0])}
      {data.messages.slice(1).map((e) => renderItem(e))}
    </Box>
  ) : (
    <Box />
  );
};

export default memo(ChatClump);
