import { Fragment, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getMe } from '@services';
import { publicRoutes } from '@constants';
import { setLoading } from '@redux/slices/statusSlice';
import { setAccountData } from '@redux/slices/authSlice';

const ProtectedRouteLayout = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const authState = useAppSelector((state) => state.auth);

  // const { data, refetch } = useQuery({
  //   queryKey: ['me'],
  //   queryFn: getMe,
  //   enabled: false
  // });

  // useEffect(() => {
  //   if (!authState.token) navigate(publicRoutes.login);
  //   else {
  //     const fetchMe = async () => {
  //       dispatch(setLoading(true));
  //       const me = await refetch();
  //       console.log(me);
  //       if (me.data?.data) dispatch(setAccountData(me.data?.data));
  //       dispatch(setLoading(false));
  //     };

  //     if (!authState.data) fetchMe();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authState.token]);

  return authState.token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRouteLayout;
