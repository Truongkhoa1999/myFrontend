import { ProductProps } from '../../type/Product/ProductProps'
import {
  RESTORE_PRODUCTBYID_FAILURE,
  RESTORE_PRODUCTBYID_REQUEST,
  RESTORE_PRODUCTBYID_SUCCESS,
  RestoreProductByIdActionTypes,
} from '../actions/restoreProductById'

// Initial state
interface RestoreProductByIdState {
  loading: boolean
  error: string | null
}

const initialState: RestoreProductByIdState = {
  loading: false,
  error: null,
}
// Reducer
const restoreProductsReducer = (
  state = initialState,
  action: RestoreProductByIdActionTypes
): RestoreProductByIdState => {
  switch (action.type) {
    // ...
    case RESTORE_PRODUCTBYID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RESTORE_PRODUCTBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case RESTORE_PRODUCTBYID_FAILURE:
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
