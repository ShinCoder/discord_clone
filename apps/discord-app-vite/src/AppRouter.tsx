import { useEffect } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import GlobalLoading from '@components/GlobalLoading';
import AuthLayout from '@layouts/AuthLayout';
import ProtectedRouteLayout from '@layouts/ProtectedRouteLayout';
import PublicRouteLayout from '@layouts/PublicRouteLayout';
import ChannelMe from '@pages/ChannelMe';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Verify from '@pages/Verify';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { clearAuthState, setAccountData } from '@redux/slices/authSlice';
import { setErrorMessage, setLoading } from '@redux/slices/statusSlice';
import { getMe } from '@services';
import { protectedRoutes, publicRoutes } from '@constants';
import ServerLayout from '@layouts/ServerLayout';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={protectedRoutes.app}
            replace
          />
        )
      },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <PublicRouteLayout />,
            children: [
              {
                path: publicRoutes.login,
                element: <Login />
              },
              {
                path: publicRoutes.register,
                element: <Register />
              }
            ]
          },
          {
            path: publicRoutes.verify,
            element: <Verify />
          }
        ]
      },
      {
        element: <ProtectedRouteLayout />,
        children: [
          {
            path: protectedRoutes.app,
            element: <Navigate to={protectedRoutes.myChannels} />
          },
          {
            path: protectedRoutes.channels(),
            element: <ServerLayout />,
            children: [
              {
                path: protectedRoutes.myChannels,
                element: <ChannelMe />
              }
            ]
          }
        ]
      }
    ]
  }
]);

const AppRouter = () => {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth);

  const { isLoading, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: false
  });

  useEffect(() => {
    if (authState.token) {
      const fetchMe = async () => {
        dispatch(setLoading(true));
        try {
          const me = await refetch({ throwOnError: true });
          if (me.data?.data) dispatch(setAccountData(me.data?.data));
        } catch (err: any) {
          /* empty */
          if (err?.status !== 401) {
            dispatch(
              setErrorMessage('Something went wrong, please try again later')
            );
            dispatch(clearAuthState());
          }
        }
        dispatch(setLoading(false));
      };

      fetchMe();
    }
  }, [authState.token, dispatch, refetch]);

  return isLoading ? <GlobalLoading /> : <RouterProvider router={router} />;
};

export default AppRouter;
