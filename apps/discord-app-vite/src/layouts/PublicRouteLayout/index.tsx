import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@redux/hooks';

const PublicRouteLayout = () => {
  const authState = useAppSelector((state) => state.auth);

  return !authState.token ? <Outlet /> : <Navigate to='/app' />;
};

export default PublicRouteLayout;
