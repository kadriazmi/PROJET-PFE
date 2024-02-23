/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import { PATH } from '@src/modules/auth/routes/paths'
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.REPO,
    component: lazy(() => import('../features/Repositories/index')),
    layout: MainLayout,
  },
]

export default routes
