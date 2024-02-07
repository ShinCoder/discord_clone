import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ForgotPasswordLink } from './elements';
import ControlledInputText from '@components/ControlledInputText';
import CustomButton from '@elements/CustomButton';
import { getMe, login } from '@services';
import { useAppDispatch } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { setAccountData, setToken } from '@redux/slices/authSlice';
import { publicRoutes } from '@constants';
import { getErrorMessage } from '@utils';

import { ILoginDto } from '@prj/types/api';
import { ApiErrorMessages } from '@prj/common';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const { data: accountData, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: false
  });

  const mutation = useMutation({
    mutationFn: (data: ILoginDto) => login(data),
    onMutate: (variables) => {
      dispatch(setLoading(true));
    },
    onSuccess: async (data, variables, context) => {
      dispatch(setToken(data.data));
      const account = await refetch();
      if (account.data?.data) {
        dispatch(setAccountData(account.data?.data));
        navigate('/channels/@me', { replace: true });
      }
    },
    onError: (error, variables, context) => {
      const message = getErrorMessage(error);

      switch (message) {
        case ApiErrorMessages.LOGIN__NOT_VERIFIED:
          setError('username', { message: 'Please verify your email first.' });
          break;
        default:
          setError('username', { message: 'Login or password is invalid.' });
          setError('password', { message: 'Login or password is invalid.' });
          break;
      }

      mutation.reset();
    },
    onSettled: (data, error, variables, context) => {
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
      <ForgotPasswordLink to={publicRoutes.forgotPassword}>
        Forgot your password?
      </ForgotPasswordLink>
      <CustomButton
        type='submit'
        variant='contained'
      >
        Log In
      </CustomButton>
    </Box>
  );
};

export default MainLoginForm;
