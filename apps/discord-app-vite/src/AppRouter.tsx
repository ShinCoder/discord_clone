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
import ServerLayout from '@layouts/ServerLayout';
import DMLayout from '@layouts/DMLayout';
import ChannelMe from '@pages/ChannelMe';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Verify from '@pages/Verify';
import DiscoverableServer from '@pages/DiscoverableServer';
import Shop from '@pages/Shop';
import DirectMessage from '@pages/DirectMessage';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { clearAuthState, setAccountData } from '@redux/slices/authSlice';
import { setErrorMessage, setLoading } from '@redux/slices/statusSlice';
import { getMe } from '@services';
import { protectedRoutes, publicRoutes } from '@constants';

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
            element: <ServerLayout />,
            children: [
              {
                element: <DMLayout />,
                children: [
                  {
                    path: protectedRoutes.myChannels,
                    element: <ChannelMe />
                  },
                  {
                    path: protectedRoutes.directMessages('pattern'),
                    element: <DirectMessage />
                  },
                  {
                    path: protectedRoutes.shop,
                    element: <Shop />
                  }
                ]
              },
              {
                path: protectedRoutes.discoverServers,
                element: <DiscoverableServer />
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
          if (err?.status !== 401) {
            dispatch(
              setErrorMessage('Something went wrong, please try again later')
            );
          } else {
            dispatch(setErrorMessage('Session expired, please login again'));
          }
          dispatch(clearAuthState());
        }
        dispatch(setLoading(false));
      };

      fetchMe();
    }
  }, [authState.token, dispatch, refetch]);

  return isLoading ? <GlobalLoading /> : <RouterProvider router={router} />;
};

export default AppRouter;
