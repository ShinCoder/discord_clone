import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme, variant }) => ({
  height: '44px',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  textTransform: 'none',
  padding: '2px 16px',
  borderRadius: theme.dcShape.borderRadius.button
}));

export default CustomButton;
