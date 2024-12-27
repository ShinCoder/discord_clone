import { memo, useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { showModal } from '@redux/slices/modalSlice';
import { sendFriendRequest } from '@services';
import { ModalKey } from '@constants';
import { FriendRequestErrorModalExtraProps } from '@components/GlobalModal/FriendRequestErrorModal';

import { ApiErrorMessages } from '@prj/common';

interface AddFriendProps {
  onSendRequest: () => void;
}
interface FormData {
  username: string;
}

const AddFriend = (props: AddFriendProps) => {
  const { onSendRequest } = props;

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [status, setStatus] = useState<
    'PENDING' | 'SUCCESS' | 'ERROR' | 'ERROR_F'
  >('PENDING');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty }
  } = useForm<FormData>({
    defaultValues: {
      username: ''
    }
  });

  const formValues = watch();

  const mutation = useMutation({
    mutationFn: sendFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: () => {
      preText.current = formValues.username;
      reset({ username: '' });
      setStatus('SUCCESS');
      onSendRequest();
    },
    onError: (error) => {
      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error?.data?.message ===
        ApiErrorMessages.SEND_FRIEND_REQUEST__ALREADY_FRIEND
      ) {
        dispatch(
          showModal({
            key: ModalKey.FRIEND_REQUEST_ERR,
            extraProps: { isFriend: true }
          } satisfies {
            key: string;
            extraProps: FriendRequestErrorModalExtraProps;
          })
        );
        setStatus('ERROR_F');
      } else {
        dispatch(
          showModal({
            key: ModalKey.FRIEND_REQUEST_ERR
          })
        );
        setStatus('ERROR');
      }
      reset({ username: formValues.username });
    }
  });

  useEffect(() => {
    if (isDirty) setStatus('PENDING');
  }, [isDirty]);

  const preText = useRef('');

  const onSubmit = (data: FormData) => {
    if (authState.data && data.username.length > 0) {
      mutation.mutate({
        accountId: authState.data.id,
        targetUsername: data.username
      });
    }
  };

  return (
    <Box
      sx={{
        padding: '20px 30px',
        border: `1px solid ${theme.dcPalette.background.modifierAccent}`
      }}
    >
      <Typography
        component='h2'
        sx={{
          color: theme.dcPalette.header.primary,
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: '20px',
          marginBottom: '8px'
        }}
      >
        ADD FRIEND
      </Typography>
      <Typography
        sx={{
          color: theme.dcPalette.header.secondary,
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: '20px',
          marginBottom: '16px'
        }}
      >
        You can add friends with their Discord username.
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id='username'
          variant='outlined'
          fullWidth
          placeholder='You can add friends with their Discord username'
          {...register('username')}
          helperText={(() => {
            switch (status) {
              case 'PENDING':
                return '';
              case 'SUCCESS':
                return `Success! Your friend request to ${preText.current} was sent.`;
              case 'ERROR':
                return "Hm, didn't work. Double check that the username is correct.";
              case 'ERROR_F':
                return "You're already friends with that user!";
            }
          })()}
          slotProps={{
            formHelperText: {
              sx: {
                color: (() => {
                  switch (status) {
                    case 'PENDING':
                      return 'transparent';
                    case 'SUCCESS':
                      return theme.dcPalette.text.positive;
                    case 'ERROR':
                    case 'ERROR_F':
                      return theme.dcPalette.text.danger;
                  }
                })()
              }
            },
            input: {
              sx: {
                height: '48px',
                color: theme.dcPalette.text.normal,
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0 12px',
                borderRadius: '8px',
                backgroundColor: theme.dcPalette.background.tertiary,

                '.MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                  borderColor: (() => {
                    switch (status) {
                      case 'PENDING':
                        return 'transparent';
                      case 'SUCCESS':
                        return theme.dcPalette.green[360] + ' !important';
                      case 'ERROR':
                      case 'ERROR_F':
                        return (
                          theme.dcPalette.status.danger.base + ' !important'
                        );
                    }
                  })()
                },

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px',
                  borderColor: theme.dcPalette.text.link
                }
              },
              endAdornment: (
                <Button
                  type='submit'
                  variant='contained'
                  disabled={formValues.username.length < 1}
                  sx={{
                    display: 'flex',
                    width: 'auto',
                    minWidth: 'auto',
                    minHeight: '32px',
                    color: theme.dcPalette.white[500],
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    lineHeight: '16px',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    padding: '2px 16px',
                    backgroundColor: theme.dcPalette.brand[500],

                    '&:disabled': {
                      color: theme.dcPalette.white[500],
                      backgroundColor: theme.dcPalette.brand[500],
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      pointerEvents: 'all'
                    }
                  }}
                >
                  Send Friend Request
                </Button>
              )
            },
            htmlInput: { style: { padding: '4px 0', marginRight: '16px' } }
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(AddFriend);
