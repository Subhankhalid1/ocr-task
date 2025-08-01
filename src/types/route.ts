import type { JSX } from 'react';
import { routePaths } from '../constants/paths';

type RouteKeys = keyof typeof routePaths;
type RouteValues = (typeof routePaths)[RouteKeys];

export type TRoute = {
  name?: string;
  path: RouteValues;
  component: () => JSX.Element;
  exact?: boolean;
};
