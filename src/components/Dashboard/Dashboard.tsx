import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { DecodedToken } from '../../type/DecodedToken/DecodedToken'

export default function Dashboard() {
  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/carts/')
      const data = await response.json()

      // get localStorage jwt
      const token = localStorage.getItem('jwt')
      const decodedToken = token ? (jwtDecode(token) as DecodedToken) : null
      const userId = decodedToken?.userId

      const userCart = data.filter((item: any) => item.userId === userId)
      console.log(userCart)
    } catch (error) {
      console.log('Error fetching cart:', error)
    }
  }

  return <></>
}
