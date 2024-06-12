import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface MainLayoutProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: MainLayoutProps) => {
  const { status, isAuthenticated } = useAppSelector((state) => state.auth)
  const isShowChildren = isAuthenticated || status != 'succeeded'
  return isShowChildren ? children : <Navigate to="/login" />
}

export default AuthGuard
