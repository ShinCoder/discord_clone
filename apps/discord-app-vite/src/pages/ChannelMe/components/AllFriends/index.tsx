import { memo } from 'react';
import { Box } from '@mui/material';

import { FriendTabTitle } from '../../elements';
import FriendItems from '../FriendItem';
import { getScrollbarStyle } from '@utils';

import { AccountDto } from '@prj/types/api';

interface AllFriendProps {
  userData: AccountDto;
  data: Array<AccountDto>;
  onDM: (id: string) => () => void;
  onRemove: (id: string) => () => void;
}

const AllFriends = (props: AllFriendProps) => {
  const { userData, data, onDM, onRemove } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ padding: '16px 20px 8px 30px' }}>
        <FriendTabTitle component='h2'>{`All friends - ${data.length}`}</FriendTabTitle>
      </Box>
      <Box
        sx={{
          marginTop: '8px',
          paddingBottom: '8px',
          ...getScrollbarStyle('auto')
        }}
      >
        {data.map((_friend) => (
          <FriendItems
            key={_friend.id}
            userData={userData}
            data={_friend}
            onDM={onDM(_friend.id)}
            onRemove={onRemove(_friend.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default memo(AllFriends);
