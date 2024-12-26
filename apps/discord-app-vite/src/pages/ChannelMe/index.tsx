import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Tabs, Typography, Grid2 } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useMutation, useQuery } from '@tanstack/react-query';

import { AddFriendHeaderTab, FriendHeaderTab } from './elements';
import OnlineFriends from './components/OnlineFriends';
import AllFriends from './components/AllFriends';
import AddFriend from './components/AddFriend';
import Blocked from './components/Blocked';
import PendingRequests from './components/PendingRequests';
import {
  getBlocked,
  getFriends,
  getPendingFriendRequest,
  removeFriend,
  unblockUser
} from '@services';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { protectedRoutes } from '@constants';

import { AccountDto, IGetFriendRequestsResult } from '@prj/types/api';

const ChannelMe = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const authState = useAppSelector((state) => state.auth);

  // Friend list
  const [friends, setFriends] = useState<Array<AccountDto>>([]);

  const { refetch: fetchFriends } = useQuery({
    queryKey: ['friends', authState.data?.id || ''],
    queryFn: ({ queryKey }) => getFriends({ accountId: queryKey[1] }),
    enabled: false
  });

  const onlineFriends = useMemo(
    () =>
      friends.filter((_friend) => _friend.connectionStatus === 'ONLINE') || [],
    [friends]
  );

  const allFriends = useMemo(() => friends || [], [friends]);

  const handleDirectMessage = useCallback(
    (id: string) => () => {
      navigate(protectedRoutes.directMessages('absolute', id));
    },
    [navigate]
  );
  // Friend list -- end

  // Friend request
  const [friendRequestLists, setFriendRequestLists] =
    useState<IGetFriendRequestsResult>({
      incomingRequests: [],
      outgoingRequests: []
    });

  const { refetch: fetchFriendRequests } = useQuery({
    queryKey: ['friend-requests', authState.data?.id || ''],
    queryFn: ({ queryKey }) => getPendingFriendRequest(queryKey[1]),
    enabled: false
  });

  const onAcceptFriendRequest = useCallback(
    async (targetId: string) => {
      setFriendRequestLists((pre) => ({
        ...pre,
        incomingRequests: pre.incomingRequests.filter((e) => e.id !== targetId)
      }));
      const rawFriends = await fetchFriends();
      if (rawFriends.data?.data) {
        setFriends(rawFriends.data.data.friends);
      }
    },
    [fetchFriends]
  );

  const onDeclineFriendRequest = useCallback((targetId: string) => {
    setFriendRequestLists((pre) => ({
      ...pre,
      incomingRequests: pre.incomingRequests.filter((e) => e.id !== targetId)
    }));
  }, []);

  const onCancelFriendRequest = useCallback((targetId: string) => {
    setFriendRequestLists((pre) => ({
      ...pre,
      outgoingRequests: pre.outgoingRequests.filter((e) => e.id !== targetId)
    }));
  }, []);
  // Friend request --end

  // Blocked
  const [blockedList, setBlockedList] = useState<Array<AccountDto>>([]);

  const { refetch: fetchBlocked } = useQuery({
    queryKey: ['blocked', authState.data?.id || ''],
    queryFn: ({ queryKey }) => getBlocked(queryKey[1]),
    enabled: false
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUser,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: (data, variables, context) => {
      setBlockedList((pre) => pre.filter((e) => e.id !== variables.targetId));
    }
  });

  const onUnblock = useCallback(
    (_id: string) => () => {
      if (authState.data) {
        unblockMutation.mutate({
          accountId: authState.data.id,
          targetId: _id
        });
      }
    },
    [authState.data, unblockMutation]
  );
  // Blocked --end

  // Add friend
  const onSendRequest = useCallback(async () => {
    const rawFriends = await fetchFriends();
    if (rawFriends.data?.data) {
      setFriends(rawFriends.data.data.friends);
    }
    const rawFriendRequests = await fetchFriendRequests();
    if (rawFriendRequests.data?.data)
      setFriendRequestLists(rawFriendRequests.data.data);
    const blocked = await fetchBlocked();
    if (blocked.data?.data) {
      setBlockedList(blocked.data.data.blocked);
    }
  }, [fetchBlocked, fetchFriendRequests, fetchFriends]);
  // Add friend --end

  // Remove friend
  const removeFriendMutation = useMutation({
    mutationFn: removeFriend,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: (data, variables, context) => {
      setFriends((pre) => pre.filter((e) => e.id !== variables.targetId));
    }
  });

  const onRemoveFriend = useCallback(
    (_id: string) => () => {
      if (authState.data) {
        removeFriendMutation.mutate({
          accountId: authState.data.id,
          targetId: _id
        });
      }
    },
    [authState.data, removeFriendMutation]
  );
  // Remove friend --end

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authState.data) {
      const fetch = async () => {
        try {
          dispatch(setLoading(true));
          const rawFriends = await fetchFriends();
          if (rawFriends.data?.data) {
            setFriends(rawFriends.data.data.friends);
          }
          const rawFriendRequests = await fetchFriendRequests();
          if (rawFriendRequests.data?.data) {
            setFriendRequestLists(rawFriendRequests.data.data);
          }
          const blocked = await fetchBlocked();
          if (blocked.data?.data) {
            setBlockedList(blocked.data.data.blocked);
          }
        } catch {
          /* empty */
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetch();
    }
  }, [
    authState.data,
    dispatch,
    fetchBlocked,
    fetchFriendRequests,
    fetchFriends
  ]);

  // Tabs
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderTabContent = useCallback(() => {
    if (authState.data) {
      switch (activeTab) {
        case 0:
          return (
            <OnlineFriends
              userData={authState.data}
              data={onlineFriends}
              onDM={handleDirectMessage}
              onRemove={onRemoveFriend}
            />
          );
        case 1:
          return (
            <AllFriends
              userData={authState.data}
              data={allFriends}
              onDM={handleDirectMessage}
              onRemove={onRemoveFriend}
            />
          );
        case 2:
          return (
            <PendingRequests
              data={friendRequestLists}
              onAcceptFriendRequest={onAcceptFriendRequest}
              onDeclineFriendRequest={onDeclineFriendRequest}
              onCancelFriendRequest={onCancelFriendRequest}
            />
          );
        case 3:
          return (
            <Blocked
              data={blockedList}
              onUnblock={onUnblock}
            />
          );
        case 4:
          return <AddFriend onSendRequest={onSendRequest} />;
      }
    }
  }, [
    activeTab,
    allFriends,
    authState.data,
    blockedList,
    friendRequestLists,
    handleDirectMessage,
    onAcceptFriendRequest,
    onCancelFriendRequest,
    onDeclineFriendRequest,
    onRemoveFriend,
    onSendRequest,
    onUnblock,
    onlineFriends
  ]);
  // Tabs --end

  return (
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
              alignItems: 'center'
            }}
          >
            <EmojiPeopleIcon
              sx={{
                width: '24px',
                height: '24px',
                margin: `0 ${theme.spacing(1)}`
              }}
            />
            <Typography
              component='h1'
              sx={{
                color: theme.dcPalette.header.primary,
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.25,
                marginRight: theme.spacing(1)
              }}
            >
              Friends
            </Typography>
            <Divider
              orientation='vertical'
              sx={{
                width: '1px',
                margin: `0 ${theme.spacing(1)}`,
                backgroundColor: theme.dcPalette.background.modifierAccent
              }}
            />
            <Tabs
              value={activeTab}
              onChange={(e, n) => {
                setActiveTab(n);
              }}
              sx={{ minHeight: 'fit-content', alignItems: 'center' }}
              TabIndicatorProps={{ sx: { display: 'none' } }}
            >
              <FriendHeaderTab
                label='Online'
                value={0}
              />
              <FriendHeaderTab
                label='All'
                value={1}
              />
              <FriendHeaderTab
                label='Pending'
                value={2}
              />
              <FriendHeaderTab
                label='Blocked'
                value={3}
              />
              <AddFriendHeaderTab
                label='Add Friend'
                value={4}
              />
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Grid2
        container
        height='100%'
      >
        <Grid2 size={8}>{renderTabContent()}</Grid2>
        <Grid2 size={4}>
          <Box
            sx={{
              height: '100%',
              padding: '16px',
              borderLeft: `1px solid ${theme.dcPalette.background.modifierAccent}`
            }}
          >
            Comming not soon
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ChannelMe;
