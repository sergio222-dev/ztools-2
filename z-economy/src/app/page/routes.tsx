import { RouteObject } from 'react-router';
import { Home } from './Home';
import { AllAccounts } from '@page/AllAccounts';
import { MainLayout } from '@page/MainLayout';

export const withLayout = (routes: RouteObject[]) => {
  return routes.map(r => ({
    ...r,
    element: <MainLayout>{r.element}</MainLayout>,
  }));
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/all-accounts',
    element: <AllAccounts />,
  },
];
