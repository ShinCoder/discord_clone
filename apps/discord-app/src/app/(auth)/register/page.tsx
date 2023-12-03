'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';

import ControlledInputText from '@components/ControlledInputText';
import ControlledCheckbox from '@components/ControlledCheckbox';
import CustomButton from '@elements/CustomButton';
import { publicRoutes } from '@constants';
import { register } from '@services';
import { getErrorMessage } from '@utils';
import { useAppDispatch } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import DateInput from './components/DateInput';
import { LoginLink, PrivacyLink, TermsLink } from './elements';

import { IRegisterDto } from '@prj/types/api';
import { ApiErrorMessages } from '@prj/common';
import Modal from '@components/Modal';

interface RegisterFormData {
  email: string;
  displayName?: string;
  username: string;
  password: string;
  dateOfBirth: Date;
  emailSubscribe: boolean;
}

const Register = () => {
  const theme = useTheme();

  const formSchema = useMemo(
    () =>
      joi.object({
        email: joi.string().messages({ 'string.empty': 'Required' }),
        displayName: joi.string().allow(''),
        username: joi.string().messages({ 'string.empty': 'Required' }),
        password: joi.string().messages({ 'string.empty': 'Required' }),
        dateOfBirth: joi.date(),
        emailSubscribe: joi.boolean()
      }),
    []
  );

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError
  } = useForm<RegisterFormData>({
    resolver: joiResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      displayName: '',
      username: '',
      password: '',
      emailSubscribe: false
    }
  });

  const dispatch = useAppDispatch();

  const [isDone, setIsDone] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: IRegisterDto) => register(data),
    onMutate: (variables) => {
      dispatch(setLoading(true));
    },
    onSuccess: (data, variables, context) => {
      setIsDone(true);
    },
    onError: (error, variables, context) => {
      const message = getErrorMessage(error);

      switch (message) {
        case ApiErrorMessages.REGISTER__EMAIL_EXISTED:
          setError('email', { message: 'Email is already registered' });
          break;
        case ApiErrorMessages.REGISTER__USERNAME_EXISTED:
          setError('username', { message: 'Username unavailable' });
          break;
        default:
          break;
      }

      if (
        message instanceof Array &&
        message[0] === ApiErrorMessages.REGISTER__AGE_RESTRICTION_VIOLATED
      )
        setError('dateOfBirth', {
          message: 'Sorry, you must be over 13 to use Discord'
        });

      mutation.reset();
    },

    onSettled: (data, error, variables, context) => {
      dispatch(setLoading(false));
    }
  });

  const setDate = useCallback(
    (date: Date) => {
      setValue('dateOfBirth', date);
    },
    [setValue]
  );

  const setDateError = useCallback(
    (error: string) => {
      setError('dateOfBirth', { message: error });
    },
    [setError]
  );

  const clearDateError = useCallback(() => {
    clearErrors('dateOfBirth');
  }, [clearErrors]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRegister = useCallback(
    handleSubmit((data) => {
      mutation.mutate(data);
    }),
    []
  );

  return (
    <>
      <Box
        sx={{
          width: '480px',
          padding: theme.spacing(4),
          borderRadius: theme.dcShape.borderRadius.panel,
          backgroundColor: 'background.default'
        }}
      >
        <Typography
          variant='h1'
          color='text.primary'
          textAlign='center'
        >
          Create an account
        </Typography>
        <Box
          component='form'
          onSubmit={handleRegister}
          sx={{ marginTop: theme.spacing(1.25) }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: theme.spacing(2.5)
            }}
          >
            <ControlledInputText
              control={control}
              label='Email'
              name='email'
              isRequired
            />
            <ControlledInputText
              control={control}
              label='Display name'
              name='displayName'
              helperText='This is how others see you. You can use special characters and emoji.'
              helperTextMode='onFocus'
            />
            <ControlledInputText
              control={control}
              label='Username'
              name='username'
              isRequired
              helperText='Please only use numbers, letters, underscores _ , or periods.'
              helperTextMode='onFocus'
            />
            <ControlledInputText
              control={control}
              label='Password'
              name='password'
              isRequired
              isPassword
            />
            <DateInput
              handleSetValue={setDate}
              error={errors.dateOfBirth?.message}
              handleSetError={setDateError}
              handleClearError={clearDateError}
            />
          </Box>
          <ControlledCheckbox
            control={control}
            name='emailSubscribe'
            label='(Optional) It’s okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.'
            sx={{ marginTop: theme.spacing(1) }}
          />
          <CustomButton
            variant='contained'
            type='submit'
            sx={{ width: '100%', marginTop: theme.spacing(2.5) }}
          >
            Continue
          </CustomButton>
          <Typography
            sx={{
              color: theme.dcPalette.text.grey,
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: '1rem',
              marginTop: theme.spacing(1)
            }}
          >
            {"By registering, you agree to Discord's "}
            <TermsLink href={publicRoutes.terms}>Terms of Service</TermsLink>
            {' and '}
            <PrivacyLink href={publicRoutes.privacy}>
              Privacy Policy
            </PrivacyLink>
            {'.'}
          </Typography>
        </Box>
        <LoginLink href={publicRoutes.login}>
          Already have an account?
        </LoginLink>
      </Box>
      <Modal
        open={isDone}
        handleClose={() => {
          return;
        }}
      >
        <Typography
          variant='h1'
          color='text.primary'
          align='center'
        >
          Verify by Email
        </Typography>
        <Typography
          variant='subtitle1'
          color='text.secondary'
          align='center'
        >
          Please check your email and follow the instructions to verify your
          account. If you did not receive an email or if it expired, you can
          resend one.
        </Typography>
        <CustomButton
          sx={{ width: '100%', marginTop: (theme) => theme.spacing(2.5) }}
          variant='white'
        >
          Resend my verification email!
        </CustomButton>
      </Modal>
    </>
  );
};

export default Register;
