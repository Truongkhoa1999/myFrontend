import { Reducer } from 'redux'
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  AddProductActionTypes,
} from '../actions/addProduct'

interface AddProductState {
  loading: boolean
  error: string | null
}

const initialState: AddProductState = {
  loading: false,
  error: null,
}

const addProductReducer: Reducer<AddProductState, AddProductActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default addProductReducer
