'use client';

import { Fragment, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getMe } from '@services';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setLoading } from '@redux/slices/statusSlice';
import { setAccountData } from '@redux/slices/authSlice';
import { publicRoutes } from '@constants';

const ProtectedGroupLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authState = useAppSelector((state) => state.auth);

  const { data: accountData, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: false
  });

  useEffect(() => {
    if (!authState.token) router.replace(publicRoutes.login);
    else {
      const fetchMe = async () => {
        dispatch(setLoading(true));
        const me = await refetch();
        console.log(me);
        if (me.data?.data) dispatch(setAccountData(me.data?.data));
        dispatch(setLoading(false));
      };

      if (!authState.data) fetchMe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token]);

  return authState.token ? children : <Fragment />;
};

export default ProtectedGroupLayout;
