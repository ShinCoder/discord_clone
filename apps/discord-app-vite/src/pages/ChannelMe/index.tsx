import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import { useQuery } from '@tanstack/react-query';

import { AddFriendHeaderTab, FriendHeaderTab } from './elements';
import OnlineFriends from './components/OnlineFriends';
import AllFriends from './components/AllFriends';
import AddFriend from './components/AddFriend';
import { getFriends } from '@services';
import { useAppSelector } from '@redux/hooks';
import { protectedRoutes } from '@constants';

const ChannelMe = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<number>(0);

  const authState = useAppSelector((state) => state.auth);

  const { data: friends, refetch } = useQuery({
    queryKey: ['friends', authState.data?.id || ''],
    queryFn: ({ queryKey }) => getFriends({ accountId: queryKey[1] }),
    enabled: false
  });

  useEffect(() => {
    if (authState.data) {
      refetch();
    }
  }, [authState.data, refetch]);

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

  const navigate = useNavigate();

  const handleDirectMessage = useCallback(
    (id: string) => () => {
      navigate(protectedRoutes.directMessages('absolute', id));
    },
    [navigate]
  );

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
      case 4:
        return <AddFriend />;
    }
  }, [activeTab, allFriends, handleDirectMessage, onlineFriends]);

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
