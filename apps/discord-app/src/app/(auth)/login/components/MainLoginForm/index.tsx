'use client';

import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { useMutation, useQuery } from '@tanstack/react-query';

import ControlledInputText from '@components/ControlledInputText';
import { getMe, login } from '@services';
import { useAppDispatch } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { setToken } from '@redux/slices/authSlice';

import { ILoginDto } from '@prj/types/api';

interface LoginFormData {
  username: string;
  password: string;
}

const MainLoginForm = () => {
  const formSchema = useMemo(
    () =>
      joi.object({
        username: joi.string().messages({ 'string.empty': 'Required' }),
        password: joi.string().messages({ 'string.empty': 'Required' })
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogin = useCallback(
    handleSubmit((data) => mutation.mutate(data)),
    []
  );

  return (
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
    </Box>
  );
};

export default MainLoginForm;
