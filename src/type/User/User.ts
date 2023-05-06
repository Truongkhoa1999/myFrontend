export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  email: string
  userName: string
  image: string
  password: string
  isAdmin: boolean
  status?: UserStatus
}

export type UserStatus = 'BANNED' | 'ACTIVE' | 'DELETED'
