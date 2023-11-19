'use client';

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import ControlledInputText from '@components/ControlledInputText';
import CustomButton from '@elements/CustomButton';
import { publicRoutes } from '@constants';
import { ForgotPasswordLink, RegisterLink } from './elements';

interface LoginFormData {
  username: string;
  password: string;
}

const MainLoginForm = () => {
  const formSchema = useMemo(
    () =>
      joi.object({
        username: joi.string().required(),
        password: joi.string().required()
      }),
    []
  );

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: joiResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant='h1'
          color='text.primary'
        >
          Welcome back!
        </Typography>
        <Typography
          variant='subtitle1'
          color='text.secondary'
        >
          {"We're so excited to see you again!"}
        </Typography>
      </Box>
      <Box
        component='form'
        onSubmit={handleSubmit((data) => console.log(data))}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: theme.spacing(2.5)
        }}
      >
        <ControlledInputText
          control={control}
          name='username'
          label='Email or phone number'
        />
        <ControlledInputText
          control={control}
          name='password'
          label='Password'
          isPassword
          sx={{ marginTop: theme.spacing(2.5) }}
        />
        <ForgotPasswordLink href={publicRoutes.forgotPassword}>
          Forgot your password?
        </ForgotPasswordLink>
        <CustomButton
          type='submit'
          variant='contained'
          sx={{}}
        >
          Log In
        </CustomButton>
        <Box sx={{ marginTop: theme.spacing(0.5) }}>
          <Typography
            component='span'
            sx={{
              color: theme.dcPalette.text.grey,
              fontSize: '0.875rem',
              lineHeight: '1rem'
            }}
          >
            Need an account?{' '}
          </Typography>
          <RegisterLink href={publicRoutes.register}>Register</RegisterLink>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLoginForm;
