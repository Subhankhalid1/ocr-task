import React from 'react';
import { Home } from '../pages/home';
import { PassportScanner } from '../pages/passport-scanner';
import { TRoute } from '../types/route';
import { routePaths } from '../constants/paths';

export const publicRoutes: TRoute[] = [
  {
    name: 'Home',
    path: routePaths.Home,
    component: () => React.createElement(Home),
    exact: true,
  },
  {
    name: 'Passport Scanner',
    path: routePaths.PassportScanner,
    component: () => React.createElement(PassportScanner),
    exact: true,
  },
];
