import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'react'
import { ProductProps } from '../../type/Product/ProductProps'

// Variables
export const RESTORE_PRODUCTBYID_REQUEST = 'RESTORE_PRODUCTBYID_REQUEST'
export const RESTORE_PRODUCTBYID_SUCCESS = 'RESTORE_PRODUCTBYID_SUCCESS'
export const RESTORE_PRODUCTBYID_FAILURE = 'RESTORE_PRODUCTBYID_FAILURE'

// SEND REQUEST
export interface restoreProductByIdRequestAction {
  type: typeof RESTORE_PRODUCTBYID_REQUEST
}
// SUCCESS
export interface restoreProductByIdSuccessAction {
  type: typeof RESTORE_PRODUCTBYID_SUCCESS
  payload: ReturnType<typeof uuidv4>
}
// Action Failure
export interface restoreProductByIdFailureAction {
  type: typeof RESTORE_PRODUCTBYID_FAILURE
  error: string
}

// Action HUB
export type RestoreProductByIdActionTypes =
  | restoreProductByIdRequestAction
  | restoreProductByIdSuccessAction
  | restoreProductByIdFailureAction

// Delete products by Id
// Action Creator
export const restoreProductsById = (id: ReturnType<typeof uuidv4>) => {
  return async (dispatch: Dispatch<RestoreProductByIdActionTypes>) => {
    try {
      // Get token and check
      const token = localStorage.getItem('jwt')
      if (!token) {
        throw new Error('JWT token not found')
      }

      dispatch({ type: RESTORE_PRODUCTBYID_REQUEST })

      const response = await fetch(`https://fs14-ecommerce.herokuapp.com/api/v1/products/restore/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        dispatch({
          type: RESTORE_PRODUCTBYID_SUCCESS,
          payload: id,
        })
      } else {
        dispatch({
          type: RESTORE_PRODUCTBYID_FAILURE,
          error: 'failed to fetch',
        })
      }
    } catch (error) {
      dispatch({
        type: RESTORE_PRODUCTBYID_FAILURE,
        error: 'failed to fetch',
      })
    }
  }
}
