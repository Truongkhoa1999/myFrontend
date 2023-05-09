import { useState } from 'react'
import { Product } from '../type/Products/products'
import { User, UserStatus } from '../../type/User/User'

// SignIn check as Users
export function findMatchingUser(email: string, password: string, users: User[]) {
  return users.find(
    (user) => user.email === email && user.password === password && user.status !== 'BANNED'
  )
}

// Filter search from database
export function findMatchingSearch(query: string, products: Product[]) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/)
  return products.filter((products) => {
    const description = products.description.toLocaleLowerCase()
    const brand = products.brand.toLocaleLowerCase()
    return words.every((word) => description.includes(word) || brand.includes(word))
  })
}

// Handle ban user in reducer
export const handleBanUsers = (id: number, users: User[]): User[] => {
  return users.map((user) => {
    return {
      ...user,
      status: user.id === id ? toggleStatus(user.status) : user.status,
    }
  })
}

const toggleStatus = (status?: UserStatus) => {
  if (status === 'BANNED') return 'ACTIVE'
  return 'BANNED'
}
