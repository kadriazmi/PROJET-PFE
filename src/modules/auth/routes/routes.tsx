/* eslint-disable @typescript-eslint/no-explicit-any */
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout'
import GuestGuard from '../../shared/guards/GuestGuard'
import { Navigate, RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import { PATH } from './paths'
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  // GuestGuard Routes
  {
    exact: true,
    path: PATH.ROOT,
    guard: GuestGuard,
    component: () => <Navigate to="/login" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.LOGIN,
    component: lazy(() => import('../features/Login/Login')),
    layout: (props: any) => <UniverseWrapper {...props} includeGlobe />,
  },
]

export default routes
