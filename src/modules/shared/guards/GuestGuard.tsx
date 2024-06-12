import { PATH } from '@src/modules/auth/routes/paths'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const { status, isAuthenticated } = useAppSelector((state) => state.auth)
  const isShowChildren = isAuthenticated || status != 'succeeded'
  return isShowChildren ? <Navigate to={PATH.REPO} /> : children
}

export default GuestGuard
