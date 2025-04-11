import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../repo/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repoRoutes]

export default routes
