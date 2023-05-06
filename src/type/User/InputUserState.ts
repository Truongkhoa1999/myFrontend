import { User } from './User'
export interface InputUserState {
  currentUser: User | null
  email: string | null
  password: string | null
}
