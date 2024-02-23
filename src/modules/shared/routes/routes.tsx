import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'
import repositoriesRoutes from '../../Repositories/routes/routes'
import pullRequestsRoutes from '../../PullRequests/routes/routes'
const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...repositoriesRoutes,
  ...pullRequestsRoutes,
]

export default routes
