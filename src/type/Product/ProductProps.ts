import { v4 as uuidv4 } from 'uuid'

interface Product {
  id: ReturnType<typeof uuidv4> // UUID string
  title: string
  price: number
  quantity: number
  brand: string
  description: string
  thumbnail: string
  images: string[]
  category: {
    categoryId: ReturnType<typeof uuidv4> // UUID string
    title: string
  }
  removed: boolean
}
