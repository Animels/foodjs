import type { ReactNode } from 'react';

export type RouteNode = {
  element: ReactNode;
  children?: Record<string, RouteNode>;
  path?: string;
};

export type RouteNodeRecord = Record<string, RouteNode>;
