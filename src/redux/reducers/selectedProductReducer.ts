import {
  ProductActionTypes,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTBYID_SUCCESS,
} from '../actions/products'
import { ProductProps } from '../../type/Product/ProductProps'

export interface ProductState {
  loading: boolean
  error: string | null
  selectedProduct: ProductProps | null
}

const initialState: ProductState = {
  loading: false,
  error: null,
  selectedProduct: null,
}

export default function selectedProductReducer(
  state = initialState,
  action: ProductActionTypes
): ProductState {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        selectedProduct: null,
      }
    case FETCH_PRODUCTBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: action.payload,
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'failed to fetch',
      }
    default:
      return state
  }
}
