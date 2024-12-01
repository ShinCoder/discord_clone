import { memo, useCallback } from 'react';
import { Box } from '@mui/material';

import { HeadTextChatItem, TextChatItem } from '../ChatItem';
import { ProcessedMessage, ProcessedMessageClump } from '@utils';

interface ChatClumpProps {
  data: ProcessedMessageClump;
}

const ChatClump = (props: ChatClumpProps) => {
  const { data } = props;

  const renderItem = useCallback((item: ProcessedMessage) => {
    switch (item.type) {
      default:
        return (
          <TextChatItem
            data={item}
            key={item.id}
          />
        );
    }
  }, []);

  const renderHeadItem = useCallback(
    (item: ProcessedMessage) => {
      switch (item.type) {
        default:
          return (
            <HeadTextChatItem
              data={item}
              sender={data.sender}
            />
          );
      }
    },
    [data.sender]
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
