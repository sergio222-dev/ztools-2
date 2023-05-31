import { RouteObject } from 'react-router';
import { Home } from './Home';
import { AllAccounts } from '@page/AllAccounts';
import { MainLayout } from '@page/MainLayout';
import { Reports } from '@page/Reports';
import { Login } from '@page/Login';
import { PrivateOutlet } from '@utils/router/PrivateOutlet';
import { ResetPassword } from '../components/forms/ResetPassword/ResetPassword';

export const withLayout = (routes: RouteObject[]) => {
  return routes.map(r => ({
    ...r,
    element: r.path === '/reset-password' ? r.element : <MainLayout>{r.element}</MainLayout>,
  }));
};

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/all-accounts',
    element: <AllAccounts />,
  },
  {
    path: '/reports',
    element: <Reports />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
];

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <PrivateOutlet />,
    children: withLayout(privateRoutes),
  },
];
