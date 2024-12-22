import { memo } from 'react';
import { Box, Skeleton } from '@mui/material';

const ChatSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '10px 48px 2px 0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '56px'
        }}
      >
        <Skeleton
          variant='circular'
          width='40px'
          height='40px'
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Skeleton
          variant='rounded'
          width='6rem'
          height='1rem'
        />
        <Skeleton
          variant='rounded'
          height='1rem'
        />
      </Box>
    </Box>
  );
};

export default memo(ChatSkeleton);
