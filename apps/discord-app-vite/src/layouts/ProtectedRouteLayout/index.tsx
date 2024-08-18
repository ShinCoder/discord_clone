import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@redux/hooks';

const ProtectedRouteLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  return authState.token ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRouteLayout;
