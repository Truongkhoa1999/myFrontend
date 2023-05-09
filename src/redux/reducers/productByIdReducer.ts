import {
  ProductByIdActionTypes,
  FETCH_PRODUCTBYID_FAILURE,
  FETCH_PRODUCTBYID_REQUEST,
  FETCH_PRODUCTBYID_SUCCESS,
} from '../actions/getProductById'
import { ProductProps } from '../../type/Products/ProductProps'
export interface Product {
  id: string
  title: string
  price: number
  quantity: number
  brand: string
  description: string
  thumbnail: string
  images: string[]
  category: {
    categoryId: string
    title: string
  }
  removed: boolean
}
export interface ProductState {
  loading: boolean
  error: string | null
  productById: Product | Product[] | null
}
const initialState: ProductState = {
  loading: false,
  error: null,
  productById: null,
}
export default function productByIdReducer(
  state = initialState,
  action: ProductByIdActionTypes
): ProductState {
  switch (action.type) {
    case FETCH_PRODUCTBYID_REQUEST:
      console.log('is fetching')
      return {
        ...state,
        loading: true,
        productById: null,
      }
    case FETCH_PRODUCTBYID_SUCCESS:
      console.log('fetched done')

      return {
        ...state,
        loading: false,
        productById: action.payload,
      }
    case FETCH_PRODUCTBYID_FAILURE:
      console.log('fetch failed')

      return {
        ...state,
        loading: false,
        error: 'failed to fetch',
      }
    default:
      return state
  }
}
