import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Tooltip, Typography, Zoom } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { ModalState } from '../modal.type';
import { PrimaryActionBtn, SecondaryActionBtn } from './elments';
import { ModalKey, protectedRoutes } from '@constants';
import UserAvatar from '@components/UserAvatar';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { hideModal } from '@redux/slices/modalSlice';

import { AccountDto, RelationshipStatus } from '@prj/types/api';

export interface ProfileModalExtraProps {
  profile: AccountDto;
}

interface ProfileModalState extends ModalState {
  extraProps: ProfileModalExtraProps;
}

const ProfileModal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal)[
    ModalKey.PROFILE
  ] as ProfileModalState;

  const handleClose = useCallback(() => {
    dispatch(hideModal(ModalKey.PROFILE));
  }, [dispatch]);

  const handleDm = useCallback(() => {
    if (modalState?.extraProps?.profile) {
      navigate(
        protectedRoutes.directMessages(
          'absolute',
          modalState.extraProps.profile.id
        )
      );
      dispatch(hideModal(ModalKey.PROFILE));
    }
  }, [dispatch, modalState?.extraProps?.profile, navigate]);

  const renderFriendAction = useCallback(() => {
    switch (modalState?.extraProps?.profile.relationshipWith?.status) {
      case RelationshipStatus.PENDING:
      case RelationshipStatus.REQUESTING:
        return (
          <Tooltip
            title='Pending'
            placement='top'
          >
            <Box>
              <Button
                disabled
                sx={{
                  width: '32px',
                  minWidth: 'auto',
                  height: '32px',
                  borderRadius: theme.dcShape.borderRadius.button,

                  '&.Mui-disabled': {
                    color: theme.dcPalette.button.secondaryText,
                    backgroundColor:
                      theme.dcPalette.button.secondaryBackgroundDisabled,
                    cursor: 'not-allowed',
                    pointerEvents: 'auto',
                    opacity: 0.5
                  }
                }}
              >
                <ManageAccountsIcon sx={{ width: '16px', height: '16px' }} />
              </Button>
            </Box>
          </Tooltip>
        );
      case RelationshipStatus.FRIEND:
        return <Box />;
      default:
        return (
          <Button
            startIcon={
              <PersonAddAlt1Icon sx={{ width: '16px', height: '16px' }} />
            }
            sx={{
              height: '32px',
              color: theme.dcPalette.button.filledBrandText,
              textTransform: 'none',
              padding: '2px 16px',
              borderRadius: theme.dcShape.borderRadius.button,
              backgroundColor: theme.dcPalette.button.filledBrandBackground,

              '&:hover': {
                backgroundColor:
                  theme.dcPalette.button.filledBrandBackgroundHover
              }
            }}
          >
            Add Friend
          </Button>
        );
    }
  }, [
    modalState?.extraProps?.profile.relationshipWith?.status,
    theme.dcPalette.button.filledBrandBackground,
    theme.dcPalette.button.filledBrandBackgroundHover,
    theme.dcPalette.button.filledBrandText,
    theme.dcPalette.button.secondaryBackgroundDisabled,
    theme.dcPalette.button.secondaryText,
    theme.dcShape.borderRadius.button
  ]);

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
            width: '600px',
            minHeight: '200px',
            borderRadius: '8px',
            backgroundColor: theme.dcPalette.primary[800],
            overflow: 'hidden'
          }}
        >
          {modalState?.extraProps?.profile && (
            <>
              <Box
                sx={{
                  height: '210px',
                  minHeight: '210px',
                  backgroundColor: modalState.extraProps.profile.bannerColor
                }}
              />
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-77px',
                    left: '24px',
                    borderRadius: '50%',
                    border: `9px solid ${theme.dcPalette.primary[800]}`
                  }}
                >
                  <UserAvatar
                    src={modalState.extraProps.profile.avatar}
                    alt={modalState.extraProps.profile.username}
                    color={modalState.extraProps.profile.bannerColor}
                    showStatus
                    status={modalState.extraProps.profile.connectionStatus}
                    size='120px'
                  />
                </Box>
                <Box
                  sx={{
                    height: '54px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    columnGap: '8px',
                    paddingTop: '16px',
                    paddingRight: '16px'
                  }}
                >
                  {renderFriendAction()}
                  <Button
                    startIcon={
                      <ChatBubbleIcon sx={{ width: '16px', height: '16px' }} />
                    }
                    variant='contained'
                    onClick={handleDm}
                    sx={{
                      height: '32px',
                      color: theme.dcPalette.button.secondaryText,
                      textTransform: 'none',
                      padding: '2px 16px',
                      borderRadius: theme.dcShape.borderRadius.button,
                      backgroundColor:
                        theme.dcPalette.button.secondaryBackground,

                      '&:hover': {
                        backgroundColor:
                          theme.dcPalette.button.secondaryBackgroundHover
                      }
                    }}
                  >
                    Message
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '12px',
                    height: '100%',
                    margin: '16px'
                  }}
                >
                  <Box>
                    <Typography
                      component='h1'
                      sx={{
                        color: theme.dcPalette.text.normal,
                        fontSize: '1.5rem',
                        lineHeight: 1.25,
                        fontWeight: 700
                      }}
                    >
                      {modalState.extraProps.profile.displayName ||
                        modalState.extraProps.profile.username}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.dcPalette.header.primary,
                        fontSize: '0.875rem',
                        lineHeight: '18px',
                        fontWeight: 400
                      }}
                    >
                      {modalState.extraProps.profile.username}
                    </Typography>
                  </Box>
                  {modalState.extraProps.profile.relationshipWith?.status ===
                    RelationshipStatus.PENDING && (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: theme.dcPalette.background.modFaint
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.dcPalette.text.normal,
                          fontSize: '0.85rem',
                          fontWeight: 400,
                          lineHeight: 1.25
                        }}
                      >
                        <Typography
                          component='strong'
                          fontWeight={600}
                        >
                          {modalState.extraProps.profile.displayName ||
                            modalState.extraProps.profile.username}
                        </Typography>{' '}
                        sent you a friend request.
                      </Typography>
                      <Box sx={{ display: 'flex', columnGap: '8px' }}>
                        <PrimaryActionBtn>Accept</PrimaryActionBtn>
                        <SecondaryActionBtn>Ignore</SecondaryActionBtn>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Zoom>
    </Modal>
  );
};

export default ProfileModal;
