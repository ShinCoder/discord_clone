import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

// ! need updating color

export const FriendHeaderTab = styled(Tab)(({ theme }) => ({
  minHeight: 'auto',
  minWidth: '40px',
  color: theme.dcPalette.interactive.normal,
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '20px',
  textTransform: 'none',
  padding: `${theme.spacing(0.25)} ${theme.spacing(1)}`,
  borderRadius: '4px',
  margin: `0  ${theme.spacing(1)}`,
  transition: 'all 0.5s ease',

  '&.Mui-selected': {
    color: theme.dcPalette.interactive.active,
    backgroundColor: theme.dcPalette.background.modifierSelected
  }
}));

export const AddFriendHeaderTab = styled(FriendHeaderTab)(({ theme }) => ({
  color: theme.dcPalette.status.positive.text,
  backgroundColor: theme.dcPalette.status.positive.background,

  '&.Mui-selected': {
    color: theme.dcPalette.text.positive,
    backgroundColor: 'transparent'
  }
}));
