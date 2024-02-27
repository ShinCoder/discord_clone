import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';

import PulsingEllipsis from '@components/PulsingEllipsis';
import CustomButton from '@elements/CustomButton';
import { verify } from '@services';
import emailCheckedImg from './assets/email_checked.svg';
import emailErrorImg from './assets/email_error.svg';
import emailInfoImg from './assets/email_info.svg';

const Verify = () => {
  const theme = useTheme();

  const searchParams = useSearchParams();

  const [state, setState] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );

  const verifyMutation = useMutation({
    mutationFn: (token: string) => verify({ verifyToken: token }),
    onSuccess: (data, variables, context) => {
      setState('success');
    },
    onError: (error, variables, context) => {
      setState('error');
    }
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) verifyMutation.mutate(token);
  }, [searchParams, verifyMutation]);

  return (
    <Box
      sx={{
        width: '480px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        borderRadius: theme.dcShape.borderRadius.panel,
        backgroundColor: 'background.default'
      }}
    >
      <img
        src={
          state === 'success'
            ? emailCheckedImg
            : state === 'error'
            ? emailErrorImg
            : emailInfoImg
        }
        alt='status_image'
        width={0}
        height={0}
        style={{
          width: '100%',
          maxWidth: '186px',
          height: '100px',
          marginBottom: theme.spacing(2.5)
        }}
      />
      <Typography
        variant='h1'
        color='text.primary'
        textAlign='center'
        sx={
          state === 'success'
            ? {
                marginBottom: theme.spacing(5)
              }
            : {}
        }
      >
        {state === 'success'
          ? 'Email Verified!'
          : state === 'error'
          ? 'Email verification link has expired.'
          : 'Verifing your email'}
      </Typography>
      {state !== 'success' && (
        <Typography
          variant='subtitle1'
          color='text.secondary'
          sx={{ marginBottom: theme.spacing(5) }}
        >
          {state === 'error'
            ? 'Please log in and resend the link.'
            : 'This may take a moment.'}
        </Typography>
      )}
      {state === 'success' ? (
        <CustomButton
          variant='contained'
          sx={{ width: '100%' }}
        >
          Continue to Discord
        </CustomButton>
      ) : state === 'error' ? (
        <CustomButton
          variant='contained'
          sx={{ width: '100%' }}
        >
          Log In
        </CustomButton>
      ) : (
        <CustomButton
          variant='white'
          sx={{
            width: '100%',
            backgroundColor: theme.dcPalette.button.secondaryBackground,
            pointerEvents: 'none'
          }}
        >
          <PulsingEllipsis />
        </CustomButton>
      )}
    </Box>
  );
};

export default Verify;
