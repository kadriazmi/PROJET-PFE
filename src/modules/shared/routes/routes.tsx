import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../repo/routes/routes'
import pullsRoutes from '../../pulls/routes/routes'
import commitRoutes from '../../commitChange/routes/routes'
import homeRoute from '../../home/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...repoRoutes,
  ...pullsRoutes,
  ...commitRoutes,
  ...homeRoute,
]

export default routes
