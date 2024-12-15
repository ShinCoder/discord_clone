import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Grid2, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';

import MessageArea from './components/MessageArea';
import { getUserProfile } from '@services';
import UserAvatar from '@components/UserAvatar';
import ChannelTextarea from '@components/ChannelTextarea';
import { ProfileModalExtraProps } from '@components/GlobalModal/ProfileModal';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { showModal } from '@redux/slices/modalSlice';
import {
  processMessageForDisplay,
  ProcessedMessageDate,
  concatenateProcessedMessages
} from '@utils';
import { ModalKey, protectedRoutes } from '@constants';

import { SocketEvents } from '@prj/common';
import {
  IJoinDirectMessageRoomData,
  ILeaveDirectMessageRoomData,
  IReceiveDirectMessageDto,
  ISendDirectMessageData,
  MessageType
} from '@prj/types/api';

const DirectMessage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { socket } = useAppSelector((state) => state.socket);
  const { data: userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id === userData?.id) {
      navigate(protectedRoutes.myChannels, { replace: true });
    }
  }, [id, navigate, userData?.id]);

  // Get target profile
  const { data: targetData, refetch } = useQuery({
    queryKey: ['user-profile', id || ''],
    queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
    enabled: false
  });

  const profile = useMemo(
    () => targetData?.data.profile,
    [targetData?.data.profile]
  );

  const handleOpenProfileModal = useCallback(() => {
    if (profile) {
      dispatch(
        showModal({
          key: ModalKey.PROFILE,
          extraProps: { profile }
        } satisfies { key: string; extraProps: ProfileModalExtraProps })
      );
    }
  }, [dispatch, profile]);
  // Get target profile --end

  // Get dm
  const [dms, setDms] = useState<Array<ProcessedMessageDate>>([]);
  const [dmsNumber, setDmsNumber] = useState<number>(0);

  const handleAddDms = useCallback((_data: Array<ProcessedMessageDate>) => {
    setDms((pre) => concatenateProcessedMessages(_data, pre));
  }, []);
  const handleAddDmsNumber = useCallback((_data: number) => {
    setDmsNumber((pre) => pre + _data);
  }, []);
  // Get dm --end

  // Send & receive dm
  useEffect(() => {
    const onReceiveDm = (_data: IReceiveDirectMessageDto) => {
      if (userData && targetData?.data.profile) {
        setDms((pre) =>
          concatenateProcessedMessages(
            pre,
            processMessageForDisplay({
              messages: [_data.message],
              senders: [userData, targetData.data.profile]
            })
          )
        );
        setDmsNumber((pre) => pre + 1);
      }
    };

    if (socket && id) {
      socket.emit(SocketEvents.joinDirectMessageRoom, {
        targetId: id
      } satisfies IJoinDirectMessageRoomData);

      socket.on(SocketEvents.receiveDirectMessage, onReceiveDm);
    }

    return () => {
      if (socket && id) {
        socket.emit(SocketEvents.leaveDirectMessageRoom, {
          targetId: id
        } satisfies ILeaveDirectMessageRoomData);

        socket.off(SocketEvents.receiveDirectMessage, onReceiveDm);
      }
    };
  }, [id, socket, targetData?.data.profile, userData]);

  const sendDm = useCallback(
    (data: { message: string }) => {
      if (socket && id) {
        // !!! HARD CODED
        socket.emit(SocketEvents.sendDirectMessage, {
          targetId: id,
          content: data.message,
          type: MessageType.TEXT
        } satisfies ISendDirectMessageData);
      }
    },
    [id, socket]
  );
  // Send & receive dm --end

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          dispatch(setLoading(true));
          await refetch();
        } catch {
          /* empty */
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, refetch]);

  return id ? (
    profile && userData && (
      <Box style={{ flex: 1 }}>
        <Box
          sx={{
            height: theme.dcShape.defaultHeight.header,
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            boxShadow: theme.dcShape.boxShadow.elevationLow
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '12px',
                paddingLeft: '8px'
              }}
              onClick={handleOpenProfileModal}
            >
              <UserAvatar
                alt={profile.id}
                src={profile.avatar}
                color={profile.bannerColor}
                showStatus
                status={profile.connectionStatus}
              />
              <Tooltip title={profile.displayName || profile.username}>
                <Box sx={{ cursor: 'pointer' }}>
                  <Typography
                    component='h1'
                    sx={{
                      color: theme.dcPalette.text.normal,
                      fontSize: '1rem',
                      lineHeight: '1.25',
                      fontWeight: 600
                    }}
                  >
                    {profile.displayName || profile.username}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Grid2
          container
          height={`calc(100dvh - ${theme.dcShape.defaultHeight.header})`}
        >
          <Grid2 size={8}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <MessageArea
                sender={userData}
                target={profile}
                dms={dms}
                onAddDms={handleAddDms}
                dmsNumber={dmsNumber}
                onAddDmsNumber={handleAddDmsNumber}
              />
              <ChannelTextarea onSubmit={sendDm} />
            </Box>
          </Grid2>
          <Grid2 size={4}>
            <Box
              sx={{
                height: '100%',
                padding: '16px',
                borderLeft: `1px solid ${theme.dcPalette.background.modifierAccent}`
              }}
            >
              Comming not soon
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    )
  ) : (
    <Navigate
      to={protectedRoutes.myChannels}
      replace
    />
  );
};

export default DirectMessage;
