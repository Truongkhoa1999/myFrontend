import { Dispatch } from 'redux'

// Variables
export const RESTORE_ALL_PRODUCTS_REQUEST = 'RESTORE_ALL_PRODUCTS_REQUEST'
export const RESTORE_ALL_PRODUCTS_SUCCESS = 'RESTORE_ALL_PRODUCTS_SUCCESS'
export const RESTORE_ALL_PRODUCTS_FAILURE = 'RESTORE_ALL_PRODUCTS_FAILURE'

// SEND REQUEST
export interface restoreAllProductsRequestAction {
  type: typeof RESTORE_ALL_PRODUCTS_REQUEST
}

// SUCCESS
export interface restoreAllProductsSuccessAction {
  type: typeof RESTORE_ALL_PRODUCTS_SUCCESS
}

// Action Failure
export interface restoreAllProductsFailureAction {
  type: typeof RESTORE_ALL_PRODUCTS_FAILURE
  error: string
}

// Action HUB
export type RestoreAllProductsActionTypes =
  | restoreAllProductsRequestAction
  | restoreAllProductsSuccessAction
  | restoreAllProductsFailureAction

// Restore all products
// Action Creator
export const restoreAllProducts = () => {
  return async (dispatch: Dispatch<RestoreAllProductsActionTypes>) => {
    try {
      // Get token and check
      const token = localStorage.getItem('jwt')
      if (!token) {
        throw new Error('JWT token not found')
      }

      dispatch({ type: RESTORE_ALL_PRODUCTS_REQUEST })

      const response = await fetch('https://fs14-ecommerce.herokuapp.com/api/v1/products/restoreAll/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        dispatch({ type: RESTORE_ALL_PRODUCTS_SUCCESS })
      } else {
        dispatch({
          type: RESTORE_ALL_PRODUCTS_FAILURE,
          error: 'Failed to restore all products',
        })
      }
    } catch (error) {
      dispatch({
        type: RESTORE_ALL_PRODUCTS_FAILURE,
        error: 'Failed to restore all products',
      })
    }
  }
}
