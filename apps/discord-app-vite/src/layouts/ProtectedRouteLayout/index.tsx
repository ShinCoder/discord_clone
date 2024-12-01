import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setSocket } from '@redux/slices/socketSlice';

const ProtectedRouteLayout = () => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let socket: Socket;

    if (authState.token) {
      socket = io(`${import.meta.env.VITE_SOCKET_URL}/chat`, {
        auth: {
          token: authState.token.accessToken
        }
      });
      dispatch(setSocket(socket));
    }

    return () => {
      socket?.disconnect();
      dispatch(setSocket(undefined));
    };
  }, [authState.token, dispatch]);

  return authState.token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRouteLayout;
