import { v4 as uuidv4 } from 'uuid'
export interface ProductProps {
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
  statics:{
    statId: ReturnType<typeof uuidv4>
    clicks: number
    rating: number
    createdAt: Date
  }
  removed: boolean
}
