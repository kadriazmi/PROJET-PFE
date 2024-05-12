import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'
import repositoriesRoutes from '../../Repositories/routes/routes'
import pullRequestsRoutes from '../../PullRequests/routes/routes'
import commitRoutes from '../../Commit/routes/routes'
import homeRoutes from '../../../home/routes'
const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...repositoriesRoutes,
  ...pullRequestsRoutes,
  ...commitRoutes,
  ...homeRoutes,
]

export default routes
