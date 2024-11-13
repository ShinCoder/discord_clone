import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppSelector } from '@redux/hooks';
import { io, Socket } from 'socket.io-client';

const ProtectedRouteLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    let socket: Socket;

    if (authState.token) {
      socket = io(`${import.meta.env.VITE_SOCKET_URL}/general`, {
        auth: {
          token: authState.token.accessToken
        }
      });
    }

    return () => {
      socket?.disconnect();
    };
  }, [authState.token]);

  return authState.token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRouteLayout;
