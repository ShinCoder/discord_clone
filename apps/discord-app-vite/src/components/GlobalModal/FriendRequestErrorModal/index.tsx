import { useCallback } from 'react';
import { Box, Button, Modal, Typography, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ModalState } from '../modal.type';
import { ModalKey } from '@constants';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { hideModal } from '@redux/slices/modalSlice';

export interface FriendRequestErrorModalExtraProps {
  isFriend?: boolean;
}

interface FriendRequestErrorModalState extends ModalState {
  extraProps?: FriendRequestErrorModalExtraProps;
}

const FriendRequestErrorModal = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal)[
    ModalKey.FRIEND_REQUEST_ERR
  ] as FriendRequestErrorModalState;

  const handleClose = useCallback(() => {
    dispatch(hideModal(ModalKey.FRIEND_REQUEST_ERR));
  }, [dispatch]);

  return (
    <Modal
      open={!!modalState?.show}
      onClose={handleClose}
    >
      <Zoom in={!!modalState?.show}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% -50%',
            width: '440px',
            maxHeight: '720px',
            minHeight: ' 200px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '4px',
            backgroundColor: theme.dcPalette.primary[600],
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              padding: '16px',
              boxShadow:
                '0 1px 0 0 hsl(220 calc(1 * 8.108%) 7.255% /.3), 0 1px 2px 0 hsl(220 calc(1 * 8.108%) 7.255% /.3)'
            }}
          >
            <Typography
              sx={{
                color: theme.dcPalette.header.primary,
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center  '
              }}
            >
              FRIEND REQUEST FAILED
            </Typography>
          </Box>
          <Box sx={{ padding: '20px 16px' }}>
            <Typography
              sx={{
                color: theme.dcPalette.text.normal,
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.25,
                textAlign: 'center'
              }}
            >
              {modalState?.extraProps?.isFriend
                ? "You're already friends with that user!"
                : "Hm, didn't work. Double check that the username is correct."}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '16px',
              backgroundColor: theme.dcPalette.primary[630]
            }}
          >
            <Button
              onClick={handleClose}
              variant='contained'
              sx={{
                width: '100%',
                minHeight: '44px',
                color: theme.dcPalette.button.filledBrandText,
                textTransform: 'none',
                borderRadius: theme.dcShape.borderRadius.button,
                backgroundColor: theme.dcPalette.button.filledBrandBackground,

                '&:hover': theme.dcPalette.button.filledBrandBackgroundHover
              }}
            >
              Okay
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default FriendRequestErrorModal;
