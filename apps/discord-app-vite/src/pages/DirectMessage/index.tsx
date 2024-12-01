import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getUserProfile } from '@services';
import UserAvatar from '@components/UserAvatar';
import ChannelTextarea from '@components/ChannelTextarea';
import { ChatDate } from '@components/Chat';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import {
  getScrollbarStyle,
  processMessageForDisplay,
  ProcessedMessageDate
} from '@utils';
import { getDirectMessages } from '@services';

import { SocketEvents } from '@prj/common';
import {
  IJoinDirectMessageRoomData,
  ILeaveDirectMessageRoomData
} from '@prj/types/api';

const PAGE_LIMIT = 10;

const DirectMessage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { socket } = useAppSelector((state) => state.socket);
  const { data: userData } = useAppSelector((state) => state.auth);

  // Get target profile
  const { data: targetData, refetch } = useQuery({
    queryKey: ['user-profile', id || ''],
    queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
    enabled: false
  });

  const profile = useMemo(
    () => targetData?.data.profile,
    [targetData?.data.profile]
  );
  // Get target profile --end

  // Get dm
  const [dms, setDms] = useState<Array<ProcessedMessageDate>>([]);
  const [dmsNumber, setDmsNumber] = useState<number>(0);
  const [isAll, setIsAll] = useState<boolean>(false);

  const { data: fetchedDms, refetch: fetchDms } = useQuery({
    queryKey: ['dms', userData?.id || '', id || '', dmsNumber],
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

  useEffect(() => {
    if (fetchedDms) {
      if (userData && targetData?.data.profile) {
        setDms((pre) => [
          ...processMessageForDisplay({
            messages: [...fetchedDms.data.messages].reverse(),
            senders: [userData, targetData.data.profile]
          }),
          ...pre
        ]);
        setDmsNumber((pre) => pre + fetchedDms.data.messages.length);
        if (fetchedDms.data.messages.length < PAGE_LIMIT) {
          setIsAll(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedDms]);

  const fetchNextDmPage = useCallback(async () => {
    if (!isAll && userData?.id && id) {
      fetchDms();
    }
  }, [fetchDms, id, isAll, userData?.id]);
  // Get dm --end

  // Send dm
  useEffect(() => {
    if (socket && id) {
      socket.emit(SocketEvents.joinDirectMessageRoom, {
        targetId: id
      } satisfies IJoinDirectMessageRoomData);
    }

    return () => {
      if (socket && id) {
        socket.emit(SocketEvents.leaveDirectMessageRoom, {
          targetId: id
        } satisfies ILeaveDirectMessageRoomData);
      }
    };
  }, [id, socket]);
  // Send dm --end

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          dispatch(setLoading(true));
          await refetch();
          await fetchNextDmPage();
        } catch {
          /* empty */
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, refetch]);

  const messageAreaId = useId();

  return (
    profile && (
      <Box style={{ flex: 1 }}>
        <Box
          sx={{
            height: theme.dcShape.defaultHeight.header,
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            boxShadow: theme.dcShape.boxShadow.elevationLow
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '12px',
                paddingLeft: '8px'
              }}
            >
              <UserAvatar
                alt={profile.id}
                src={profile.avatar}
                color={profile.bannerColor}
                showStatus
                status={profile.connectionStatus}
              />
              <Typography
                component='h1'
                sx={{
                  color: theme.dcPalette.text.normal,
                  fontSize: '1rem',
                  lineHeight: '1.25',
                  fontWeight: 600
                }}
              >
                {profile.displayName}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: `calc(100dvh - ${theme.dcShape.defaultHeight.header})`
          }}
        >
          <Box
            sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column-reverse',
                overflowY: 'auto',
                ...getScrollbarStyle('auto')
              }}
              id={messageAreaId}
            >
              <InfiniteScroll
                dataLength={dms.length}
                next={fetchNextDmPage}
                hasMore={!isAll}
                loader={<h4>Loading...</h4>}
                inverse
                endMessage={<h4>That's all!</h4>}
                scrollableTarget={messageAreaId}
              >
                {dms.map((e) => (
                  <ChatDate
                    data={e}
                    key={e.date.format()}
                  />
                ))}
              </InfiniteScroll>
            </Box>
            <ChannelTextarea
              onSubmit={() => {
                console.log('SUBMIT');
              }}
            />
          </Box>
          <Box
            sx={{
              flex: '1 0 25%',
              minWidth: '360px',
              maxWidth: '420px',
              height: '100%',
              padding: '16px',
              borderLeft: `1px solid ${theme.dcPalette.background.modifierAccent}`
            }}
          >
            Comming not soon
          </Box>
        </Box>
      </Box>
    )
  );
};

export default DirectMessage;
