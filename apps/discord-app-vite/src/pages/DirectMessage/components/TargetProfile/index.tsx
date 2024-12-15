import { memo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { PrimaryActionBtn, SecondaryActionBtn } from './elments';
import UserAvatar from '@components/UserAvatar';
import VerticalSeperator from '@components/VerticalSeperator';

import { AccountDto, RelationshipStatus } from '@prj/types/api';

interface TargetProfileProps {
  data: AccountDto;
}

const TargetProfile = (props: TargetProfileProps) => {
  const { data } = props;
  const theme = useTheme();

  const renderFriendAction = useCallback(() => {
    switch (data.relationshipWith?.status) {
      case RelationshipStatus.PENDING:
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
            <Typography
              sx={{
                color: theme.dcPalette.header.secondary,
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.25
              }}
            >
              Sent you a friend request:
            </Typography>
            <PrimaryActionBtn>Accept</PrimaryActionBtn>
            <SecondaryActionBtn>Ignore</SecondaryActionBtn>
          </Box>
        );
      case RelationshipStatus.REQUESTING:
        return (
          <PrimaryActionBtn disabled>Friend Request Sent</PrimaryActionBtn>
        );
      case RelationshipStatus.FRIEND:
        return <SecondaryActionBtn>Remove Friend</SecondaryActionBtn>;
      default:
        return <PrimaryActionBtn>Add Friend</PrimaryActionBtn>;
    }
  }, [data.relationshipWith?.status, theme.dcPalette.header.secondary]);

  const renderBlockAction = useCallback(() => {
    switch (data.relationshipWith?.status) {
      default:
        return <SecondaryActionBtn>Block</SecondaryActionBtn>;
    }
  }, [data.relationshipWith?.status]);

  return (
    <Box sx={{ padding: '16px' }}>
      <UserAvatar
        src={data.avatar}
        alt={data.username}
        color={data.bannerColor}
        showStatus={false}
        size='80px'
      />
      <Typography
        component='h3'
        sx={{
          color: theme.dcPalette.text.normal,
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1.25,
          margin: '8px 0'
        }}
      >
        {data.displayName || data.username}
      </Typography>
      <Typography
        component='h3'
        sx={{
          color: theme.dcPalette.text.normal,
          fontSize: '1.5rem',
          fontWeight: 500,
          lineHeight: 1.25,
          marginBottom: '20px'
        }}
      >
        {data.username}
      </Typography>
      <Typography
        sx={{
          color: theme.dcPalette.header.secondary,
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.25
        }}
      >
        This is the beginning of your direct message history with{' '}
        <Typography
          component='strong'
          sx={{ fontWeight: 600 }}
        >
          {data.displayName || data.username}
        </Typography>
        .
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <Typography
          sx={{
            color: theme.dcPalette.header.secondary,
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.25
          }}
        >
          No servers in common
        </Typography>
        <Box
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            margin: '0 16px',
            backgroundColor: theme.dcPalette.background.accent
          }}
        />
        {renderFriendAction()}
        <VerticalSeperator radius='4px' />
        {renderBlockAction()}
      </Box>
    </Box>
  );
};

export default memo(TargetProfile);
