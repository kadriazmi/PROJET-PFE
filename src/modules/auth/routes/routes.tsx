/* eslint-disable @typescript-eslint/no-explicit-any */
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout'
import GuestGuard from '../../shared/guards/GuestGuard'
import { Navigate, RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'

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
    path: '/',
    guard: GuestGuard,
    component: () => <Navigate to="/login" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('../features/Login/Login')),
    layout: GuestLayout,
  },
]

export default routes
