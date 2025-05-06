import { lazy } from 'react'
import { PATH } from '@src/modules/auth/routes/paths'
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'

const routes = [
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.COMMIT,
    component: lazy(() => import('../commitchange')),
    layout: MainLayout,
  },
]

export default routes
