import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const CustomDivider = styled(Divider)(({ theme }) => ({
  borderRadius: '1px',
  backgroundColor: theme.dcPalette.background.modifierAccent
}));

export default CustomDivider;
