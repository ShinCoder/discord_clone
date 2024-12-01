import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useQuery } from '@tanstack/react-query';

import { AddFriendHeaderTab, FriendHeaderTab } from './elements';
import OnlineFriends from './components/OnlineFriends';
import AllFriends from './components/AllFriends';
import AddFriend from './components/AddFriend';
import Blocked from './components/Blocked';
import PendingRequests from './components/PendingRequests';
import { getFriends, getPendingFriendRequest } from '@services';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { protectedRoutes } from '@constants';

import { AccountDto } from '@prj/types/api';

const ChannelMe = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const authState = useAppSelector((state) => state.auth);

  // Friend list
  const { data: friends, refetch: fetchFriends } = useQuery({
    queryKey: ['friends', authState.data?.id || ''],
    queryFn: ({ queryKey }) => getFriends({ accountId: queryKey[1] }),
    enabled: false
  });

  const onlineFriends = useMemo(
    () =>
      friends?.data.friends.filter(
        (_friend) => _friend.connectionStatus === 'ONLINE'
      ) || [],
    [friends?.data.friends]
  );

  const allFriends = useMemo(
    () => friends?.data.friends || [],
    [friends?.data.friends]
  );

  const handleDirectMessage = useCallback(
    (id: string) => () => {
      navigate(protectedRoutes.directMessages('absolute', id));
    },
    [navigate]
  );
  // Friend list -- end

  // Friend request
  const [friendRequestList, setFriendRequestList] = useState<Array<AccountDto>>(
    []
  );

  const { data: friendRequests, refetch: fetchFriendRequests } = useQuery({
    queryKey: ['friend-requests', authState.data?.id || ''],
    queryFn: ({ queryKey }) => getPendingFriendRequest(queryKey[1]),
    enabled: false
  });

  useEffect(() => {
    if (friendRequests?.data) {
      setFriendRequestList(friendRequests.data.accounts);
    }
  }, [friendRequests?.data]);

  const onAcceptFriendRequest = useCallback(
    (targetId: string) => {
      setFriendRequestList((pre) => pre.filter((e) => e.id !== targetId));
      fetchFriends();
    },
    [fetchFriends]
  );

  const onDeclineFriendRequest = useCallback((targetId: string) => {
    setFriendRequestList((pre) => pre.filter((e) => e.id !== targetId));
  }, []);
  // Friend request --end

  // Add friend
  const onSendRequest = useCallback(() => {
    fetchFriendRequests();
  }, [fetchFriendRequests]);
  // Add friend --end

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authState.data) {
      const fetch = async () => {
        try {
          dispatch(setLoading(true));
          await fetchFriends();
          await fetchFriendRequests();
        } catch {
          /* empty */
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetch();
    }
  }, [authState.data, dispatch, fetchFriendRequests, fetchFriends]);

  // Tabs
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case 0:
        return (
          <OnlineFriends
            data={onlineFriends}
            onDM={handleDirectMessage}
          />
        );
      case 1:
        return (
          <AllFriends
            data={allFriends}
            onDM={handleDirectMessage}
          />
        );
      case 2:
        return (
          <PendingRequests
            data={friendRequestList}
            onAcceptFriendRequest={onAcceptFriendRequest}
            onDeclineFriendRequest={onDeclineFriendRequest}
          />
        );
      case 3:
        return <Blocked data={[]} />;
      case 4:
        return <AddFriend onSendRequest={onSendRequest} />;
    }
  }, [
    activeTab,
    allFriends,
    friendRequestList,
    handleDirectMessage,
    onAcceptFriendRequest,
    onDeclineFriendRequest,
    onSendRequest,
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
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ flex: '1 1 auto' }}>{renderTabContent()}</Box>
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
  );
};

export default ChannelMe;
