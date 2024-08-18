import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

// ! need updating color

export const FriendHeaderTab = styled(Tab)(({ theme }) => ({
  minHeight: 'auto',
  minWidth: '40px',
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '20px',
  textTransform: 'none',
  padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
  borderRadius: '4px',
  margin: `0  ${theme.spacing(1)}`,

  '&.Mui-selected': {
    color: 'white',
    backgroundColor: theme.dcPalette.background.modifierSelected
  }
}));

export const AddFriendHeaderTab = styled(FriendHeaderTab)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.dcPalette.green[430],

  '&.Mui-selected': {
    color: theme.dcPalette.green[430],
    backgroundColor: 'transparent'
  }
}));
