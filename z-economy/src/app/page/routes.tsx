import { RouteObject } from 'react-router';
import { Home } from './Home';
import { AllAccounts } from '@page/AllAccounts';

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
