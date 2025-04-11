/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { PATH } from '@src/modules/auth/routes/paths'
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
    component: lazy(() => import('../index')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
