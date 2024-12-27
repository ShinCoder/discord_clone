import { memo, useCallback } from 'react';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { FriendTabTitle } from '../../elements';
import IncomingRequestItem from '../IncomingRequestItem';
import OutgoingRequestItem from '../OutgoingRequestItem';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest
} from '@services';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { getScrollbarStyle } from '@utils';

import { AccountDto, IGetFriendRequestsResult } from '@prj/types/api';

interface PendingRequestsProps {
  data: IGetFriendRequestsResult;
  onAcceptFriendRequest: (targetId: string) => void;
  onDeclineFriendRequest: (targetId: string) => void;
  onCancelFriendRequest: (targetId: string) => void;
}

const PendingRequests = (props: PendingRequestsProps) => {
  const {
    data,
    onAcceptFriendRequest,
    onDeclineFriendRequest,
    onCancelFriendRequest
  } = props;

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const acceptRequestMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: (data, variables, context) => {
      onAcceptFriendRequest(variables.targetId);
    }
  });

  const declineRequestMutation = useMutation({
    mutationFn: declineFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: (data, variables, context) => {
      onDeclineFriendRequest(variables.targetId);
    }
  });

  const cancelRequestMutation = useMutation({
    mutationFn: cancelFriendRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
    onSuccess: (data, variables, context) => {
      onCancelFriendRequest(variables.targetId);
    }
  });

  const handleAcceptRequest = useCallback(
    (data: AccountDto) => () => {
      if (authState.data) {
        acceptRequestMutation.mutate({
          accountId: authState.data.id,
          targetId: data.id
        });
      }
    },
    [acceptRequestMutation, authState.data]
  );

  const handleDeclineRequest = useCallback(
    (data: AccountDto) => () => {
      if (authState.data) {
        declineRequestMutation.mutate({
          accountId: authState.data.id,
          targetId: data.id
        });
      }
    },
    [declineRequestMutation, authState.data]
  );

  const handleCancelRequest = useCallback(
    (data: AccountDto) => () => {
      if (authState.data) {
        cancelRequestMutation.mutate({
          accountId: authState.data.id,
          targetId: data.id
        });
      }
    },
    [cancelRequestMutation, authState.data]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ padding: '16px 20px 8px 30px' }}>
        <FriendTabTitle component='h2'>{`Pending - ${data.incomingRequests.length}`}</FriendTabTitle>
      </Box>
      <Box
        sx={{
          marginTop: '8px',
          paddingBottom: '8px',
          ...getScrollbarStyle('auto')
        }}
      >
        {data.incomingRequests.map((_request) => (
          <IncomingRequestItem
            key={_request.id}
            data={_request}
            onAccept={handleAcceptRequest(_request)}
            onDecline={handleDeclineRequest(_request)}
          />
        ))}
        {data.outgoingRequests.map((_request) => (
          <OutgoingRequestItem
            key={_request.id}
            data={_request}
            onCancel={handleCancelRequest(_request)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default memo(PendingRequests);
