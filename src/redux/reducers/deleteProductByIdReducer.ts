import { ProductProps } from '../../type/Product/ProductProps'
import {
  DELETE_PRODUCTBYID_FAILURE,
  DELETE_PRODUCTBYID_REQUEST,
  DELETE_PRODUCTBYID_SUCCESS,
  DeleteProductByIdActionTypes,
} from '../actions/deleteProductById'

// Initial state
interface DeleteProductByIdState {
  loading: boolean
  error: string | null
}

const initialState: DeleteProductByIdState = {
  loading: false,
  error: null,
}
// Reducer
const deleteProductsReducer = (
  state = initialState,
  action: DeleteProductByIdActionTypes
): DeleteProductByIdState => {
  switch (action.type) {
    // ...
    case DELETE_PRODUCTBYID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DELETE_PRODUCTBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case DELETE_PRODUCTBYID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    // ...
    default:
      return state
  }
}
