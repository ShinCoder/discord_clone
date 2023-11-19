import { styled } from '@mui/material/styles';

import CustomLink from '@elements/CustomLink';

const ForgotPasswordLink = styled(CustomLink)(() => ({
  fontSize: '0.875rem',
  margin: '4px 0 20px 0'
}));

const RegisterLink = styled(CustomLink)(() => ({
  fontSize: '0.875rem'
}));

export { ForgotPasswordLink, RegisterLink };
