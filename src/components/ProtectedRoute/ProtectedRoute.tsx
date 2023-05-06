import { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../react/context/AuthContext'
import { stateProps } from '../../redux/reducers/userReducer'
import { RootState } from '../../redux/store'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuthContext()
  if (!user?.isAdmin) {
    return <Navigate to="/homepage" replace />
  }
  return <>{children}</>
}
export default ProtectedRoute
