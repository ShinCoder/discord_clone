import { memo, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';

import BrandIcon from '@components/BrandIcon';

interface UserAvatarProps {
  src?: string;
  alt: string;
  color?: string;
  showStatus?: boolean;
  status?: 'ONLINE' | 'OFFLINE';
}

const UserAvatar = (props: UserAvatarProps) => {
  const {
    src,
    alt,
    color = 'transparent',
    showStatus = false,
    status = 'OFFLINE'
  } = props;

  const theme = useTheme();

  const renderAvatar = useCallback(() => {
    return (
      <Avatar
        sx={{ width: '32px', height: '32px', backgroundColor: color }}
        src={src}
        alt={alt}
      >
        {!src && (
          <BrandIcon
            color='white'
            width='20px'
            height='20px'
          />
        )}
      </Avatar>
    );
  }, [alt, color, src]);

  const render = useCallback(() => {
    if (showStatus) {
      switch (status) {
        case 'ONLINE':
          return (
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
              sx={{
                height: 'fit-content',

                '& .MuiBadge-badge': {
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: theme.dcPalette.green[360]
                }
              }}
            >
              {renderAvatar()}
            </Badge>
          );
        case 'OFFLINE':
          return (
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
              sx={{
                '& .MuiBadge-badge': {
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(128, 132, 142)'
                }
              }}
            >
              {renderAvatar()}
            </Badge>
          );
        default:
          return renderAvatar();
      }
    } else {
      return renderAvatar();
    }
  }, [renderAvatar, showStatus, status, theme.dcPalette.green]);

  return render();
};

export default memo(UserAvatar);
