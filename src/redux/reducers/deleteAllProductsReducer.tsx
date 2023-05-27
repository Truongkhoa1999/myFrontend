import {
    DELETE_ALL_PRODUCTS_FAILURE,
    DELETE_ALL_PRODUCTS_REQUEST,
    DELETE_ALL_PRODUCTS_SUCCESS,
    DeleteAllProductsActionTypes,
  } from '../actions/deleteAllProducts'
  
  // Initial state
  interface DeleteAllProductsState {
    loading: boolean
    error: string | null
  }
  
  const initialState: DeleteAllProductsState = {
    loading: false,
    error: null,
  }
  
  // Reducer
  const deleteAllProductsReducer = (
    state = initialState,
    action: DeleteAllProductsActionTypes
  ): DeleteAllProductsState => {
    switch (action.type) {
      case DELETE_ALL_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        }
      case DELETE_ALL_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        }
      case DELETE_ALL_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        }
      default:
        return state
    }
  }
  
  export default deleteAllProductsReducer
  