import {
  ProductByIdActionTypes,
  FETCH_PRODUCTBYID_FAILURE,
  FETCH_PRODUCTBYID_REQUEST,
  FETCH_PRODUCTBYID_SUCCESS,
} from '../actions/getProductById'
import {
  DELETE_PRODUCTBYID_FAILURE,
  DELETE_PRODUCTBYID_REQUEST,
  DELETE_PRODUCTBYID_SUCCESS,
} from '../actions/deleteProductById'
import { ProductProps } from '../../type/Product/ProductProps'

export interface ProductByIdState {
  loading: boolean
  error: string | null
  productById: ProductProps | null
}
const initialState: ProductByIdState = {
  loading: false,
  error: null,
  productById: null,
}
export default function getProductByIdReducer(
  state = initialState,
  action: ProductByIdActionTypes
): ProductByIdState {
  switch (action.type) {
    case FETCH_PRODUCTBYID_REQUEST:
      console.log('is fetching')
      return {
        ...state,
        loading: true,
        // productById: null,
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
