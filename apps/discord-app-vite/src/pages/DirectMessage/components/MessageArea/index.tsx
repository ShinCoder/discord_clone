import { memo, useCallback, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { Box } from '@mui/material';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import TargetProfile from '../TargetProfile';
import { ChatDate, ChatSkeleton } from '@components/Chat';
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
  onRemoveFriend: () => void;
  onBlockUser: () => void;
  onUnblockUser: () => void;
}

const PAGE_LIMIT = 50;

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
    onIgnoreFriend,
    onRemoveFriend,
    onBlockUser,
    onUnblockUser
  } = props;

  const [hasMore, setHasMore] = useState<boolean>(true);

  const { refetch } = useQuery({
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

  const fetchDms = useCallback(async () => {
    if (hasMore && !processing) {
      setProcessing(true);
      try {
        const result = await refetch();

        if (result.data?.data) {
          onAddDms(
            processMessageForDisplay({
              messages: [...result.data.data.messages].reverse(),
              senders: [sender, target]
            })
          );
          onAddDmsNumber(result.data.data.messages.length);

          if (result.data.data.messages.length < PAGE_LIMIT) setHasMore(false);
        }
      } catch {
        /* empty */
      } finally {
        setProcessing(false);
      }
    }
  }, [hasMore, onAddDms, onAddDmsNumber, processing, refetch, sender, target]);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'auto',
        paddingTop: '50px',

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
          onChange={async (inView) => {
            if (inView) await fetchDms();
          }}
          rootMargin='1000px'
        />
      )}
      {processing && (
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
      )}
      {!hasMore && (
        <TargetProfile
          data={target}
          onAddFriend={onAddFriend}
          onAcceptFriend={onAcceptFriend}
          onIgnoreFriend={onIgnoreFriend}
          onRemoveFriend={onRemoveFriend}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
        />
      )}
    </Box>
  );
};

export default memo(MessageArea);
