import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../repo/routes/routes'
import pullsRoutes from '../../pulls/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repoRoutes, ...pullsRoutes]

export default routes
