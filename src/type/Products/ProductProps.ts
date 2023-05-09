import { v4 as uuidv4 } from 'uuid'
export interface ProductProps {
  // String groups
  id: ReturnType<typeof uuidv4>
  title: string
  description: string
  images: string[]
  thumbnail: string
  brand: string
  // other entities:
  category: {
    categoryId: ReturnType<typeof uuidv4>
    title: string
  }
  // number group
  quantity: number
  price: number
  removed: boolean
}
