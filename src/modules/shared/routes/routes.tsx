import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repoRoutes from '../../repo/routes/routes'
import pullsRoutes from '../../pulls/routes/routes'
import commitRoutes from '../../commitChange/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repoRoutes, ...pullsRoutes, ...commitRoutes]

export default routes
