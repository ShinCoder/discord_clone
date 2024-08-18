import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { AddFriendHeaderTab, FriendHeaderTab } from './elements';

const ChannelMe = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<number>(0);

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
      {
        // Tabs content
      }
      <Box>Comming soon</Box>
    </Box>
  );
};

export default ChannelMe;
