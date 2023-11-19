import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme }) => ({
  height: '44px',
  fontSize: '1rem',
  textTransform: 'none',
  padding: '2px 16px',
  borderRadius: theme.dcShape.borderRadius.button
}));

export default CustomButton;
