import {
    RESTORE_ALL_PRODUCTS_FAILURE,
    RESTORE_ALL_PRODUCTS_REQUEST,
    RESTORE_ALL_PRODUCTS_SUCCESS,
    RestoreAllProductsActionTypes,
  } from '../actions/restoreAllProducts'
  
  // Initial state
  interface RestoreAllProductsState {
    loading: boolean
    error: string | null
  }
  
  const initialState: RestoreAllProductsState = {
    loading: false,
    error: null,
  }
  
  const restoreAllProductsReducer = (
    state = initialState,
    action: RestoreAllProductsActionTypes
  ): RestoreAllProductsState => {
    switch (action.type) {
      case RESTORE_ALL_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        }
      case RESTORE_ALL_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        }
      case RESTORE_ALL_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        }
      default:
        return state
    }
  }
  
  export default restoreAllProductsReducer
  