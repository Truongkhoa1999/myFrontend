import { Dispatch } from 'redux'

// Variables
export const DELETE_ALL_PRODUCTS_REQUEST = 'DELETE_ALL_PRODUCTS_REQUEST'
export const DELETE_ALL_PRODUCTS_SUCCESS = 'DELETE_ALL_PRODUCTS_SUCCESS'
export const DELETE_ALL_PRODUCTS_FAILURE = 'DELETE_ALL_PRODUCTS_FAILURE'

// SEND REQUEST
export interface deleteAllProductsRequestAction {
  type: typeof DELETE_ALL_PRODUCTS_REQUEST
}

// SUCCESS
export interface deleteAllProductsSuccessAction {
  type: typeof DELETE_ALL_PRODUCTS_SUCCESS
}

// Action Failure
export interface deleteAllProductsFailureAction {
  type: typeof DELETE_ALL_PRODUCTS_FAILURE
  error: string
}

// Action HUB
export type DeleteAllProductsActionTypes =
  | deleteAllProductsRequestAction
  | deleteAllProductsSuccessAction
  | deleteAllProductsFailureAction

// Delete all products
// Action Creator
export const deleteAllProducts = () => {
  return async (dispatch: Dispatch<DeleteAllProductsActionTypes>) => {
    try {
      // Get token and check
      const token = localStorage.getItem('jwt')
      if (!token) {
        throw new Error('JWT token not found')
      }

      dispatch({ type: DELETE_ALL_PRODUCTS_REQUEST })

      const response = await fetch('https://fs14-ecommerce.herokuapp.com/api/v1/products/deleteAll/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        dispatch({ type: DELETE_ALL_PRODUCTS_SUCCESS })
      } else {
        dispatch({
          type: DELETE_ALL_PRODUCTS_FAILURE,
          error: 'Failed to delete all products',
        })
      }
    } catch (error) {
      dispatch({
        type: DELETE_ALL_PRODUCTS_FAILURE,
        error: 'Failed to delete all products',
      })
    }
  }
}
