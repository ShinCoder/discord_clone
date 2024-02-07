import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomLink = styled(Link)(({ theme }) => ({
  display: 'inline',
  color: theme.dcPalette.link,
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline'
  }
}));

export default CustomLink;
