'use client';

import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { useMutation, useQuery } from '@tanstack/react-query';

import ControlledInputText from '@components/ControlledInputText';
import CustomButton from '@elements/CustomButton';
import { publicRoutes } from '@constants';
import { getMe, login } from '@services';
import { useAppDispatch } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { setToken } from '@redux/slices/authSlice';
import { ForgotPasswordLink, RegisterLink } from './elements';

import { ILoginDto } from '@prj/types/api';

interface LoginFormData {
  username: string;
  password: string;
}

const MainLoginForm = () => {
  const formSchema = useMemo(
    () =>
      joi.object({
        username: joi
          .string()
          .required()
          .messages({ 'string.empty': 'Required', 'any.required': 'Required' }),
        password: joi
          .string()
          .required()
          .messages({ 'string.empty': 'Required', 'any.required': 'Required' })
      }),
    []
  );

  const { handleSubmit, control, setError } = useForm<LoginFormData>({
    resolver: joiResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const { data: accountData, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: false
  });

  const mutation = useMutation({
    mutationFn: (data: ILoginDto) => {
      return login(data);
    },
    onMutate: (variables) => {
      dispatch(setLoading(true));
    },
    onSuccess: async (data, variables, context) => {
      dispatch(setToken(data.data));
      const account = await refetch();
      console.log(account);
      dispatch(setLoading(false));
    },
    onError: (error, variables, context) => {
      setError('username', { message: 'Login or password is invalid.' });
      setError('password', { message: 'Login or password is invalid.' });
      mutation.reset();
      dispatch(setLoading(false));
    }
  });

  const handleLogin = useCallback(
    handleSubmit((data) => mutation.mutate(data)),
    []
  );

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
        onSubmit={handleLogin}
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
          isRequired
        />
        <ControlledInputText
          control={control}
          name='password'
          label='Password'
          isPassword
          isRequired
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
