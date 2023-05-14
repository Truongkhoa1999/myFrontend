import React, { createContext, useContext } from 'react'
import { User } from '../../type/User/User'
export type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})
export const useAuthContext = () => {
  return useContext(AuthContext)
}
export default AuthContext
