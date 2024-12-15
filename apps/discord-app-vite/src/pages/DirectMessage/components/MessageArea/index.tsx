import { memo, useCallback, useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { Box } from '@mui/material';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import TargetProfile from '../TargetProfile';
import { ChatDate } from '@components/Chat';
import { getDirectMessages } from '@services';
import {
  getScrollbarStyle,
  ProcessedMessageDate,
  processMessageForDisplay
} from '@utils';

import { AccountDto } from '@prj/types/api';

interface MessageAreaProps {
  sender: AccountDto;
  target: AccountDto;
  dms: Array<ProcessedMessageDate>;
  onAddDms: (_data: Array<ProcessedMessageDate>) => void;
  dmsNumber: number;
  onAddDmsNumber: (_data: number) => void;
  onAddFriend: () => void;
  onAcceptFriend: () => void;
  onIgnoreFriend: () => void;
}

const PAGE_LIMIT = 10;

const MessageArea = (props: MessageAreaProps) => {
  const {
    sender,
    target,
    dms,
    onAddDms,
    dmsNumber,
    onAddDmsNumber,
    onAddFriend,
    onAcceptFriend,
    onIgnoreFriend
  } = props;

  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['dms', sender.id, target.id, dmsNumber],
    queryFn: ({
      queryKey
    }: QueryFunctionContext<[string, string, string, number]>) =>
      getDirectMessages({
        senderId: queryKey[1],
        targetId: queryKey[2],
        take: PAGE_LIMIT,
        skip: queryKey[3]
      }),
    enabled: false
  });

  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (data?.data.messages) {
      onAddDms(
        processMessageForDisplay({
          messages: [...data.data.messages].reverse(),
          senders: [sender, target]
        })
      );
      onAddDmsNumber(data.data.messages.length);

      if (data.data.messages.length < PAGE_LIMIT) setHasMore(false);

      setProcessing(false);
    }
  }, [data, onAddDms, onAddDmsNumber, sender, target]);

  const fetchDms = useCallback(async () => {
    if (hasMore && !isFetching && !processing) {
      setProcessing(true);
      await refetch();
    }
  }, [hasMore, isFetching, processing, refetch]);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',

        ...getScrollbarStyle('auto')
      }}
    >
      {[...dms].reverse().map((e) => (
        <ChatDate
          data={e}
          key={e.date.format()}
        />
      ))}
      {hasMore && !processing && (
        <InView
          onChange={(inView) => {
            if (inView) fetchDms();
          }}
        />
      )}
      {!hasMore && (
        <TargetProfile
          data={target}
          onAddFriend={onAddFriend}
          onAcceptFriend={onAcceptFriend}
          onIgnoreFriend={onIgnoreFriend}
        />
      )}
    </Box>
  );
};

export default memo(MessageArea);
