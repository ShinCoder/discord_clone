import CustomLink from '@elements/CustomLink';
import { styled } from '@mui/material/styles';

export const TermsLink = styled(CustomLink)(({ theme }) => ({
  fontSize: 'inherit'
}));

export const PrivacyLink = styled(CustomLink)(({ theme }) => ({
  fontSize: 'inherit'
}));

export const LoginLink = styled(CustomLink)(({ theme }) => ({
  display: 'inline-block',
  fontSize: '0.875rem',
  marginTop: theme.spacing(2.5)
}));
