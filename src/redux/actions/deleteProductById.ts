import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'react'
import { ProductProps } from '../../type/Product/ProductProps'

// Variables
export const DELETE_PRODUCTBYID_REQUEST = 'DELETE_PRODUCTBYID_REQUEST'
export const DELETE_PRODUCTBYID_SUCCESS = 'DELETE_PRODUCTBYID_SUCCESS'
export const DELETE_PRODUCTBYID_FAILURE = 'DELETE_PRODUCTBYID_FAILURE'

// SEND REQUEST
export interface deleteProductByIdRequestAction {
  type: typeof DELETE_PRODUCTBYID_REQUEST
}
// SUCCESS
export interface deleteProductByIdSuccessAction {
  type: typeof DELETE_PRODUCTBYID_SUCCESS
  payload: ReturnType<typeof uuidv4>
}
// Action Failure
export interface deleteProductByIdFailureAction {
  type: typeof DELETE_PRODUCTBYID_FAILURE
  error: string
}

// Action HUB
export type DeleteProductByIdActionTypes =
  | deleteProductByIdRequestAction
  | deleteProductByIdSuccessAction
  | deleteProductByIdFailureAction

// Delete products by Id
// Action Creator
export const deleteProductsById = (id: ReturnType<typeof uuidv4>) => {
  return async (dispatch: Dispatch<DeleteProductByIdActionTypes>) => {
    try {
      // Get token and check
      const token = localStorage.getItem('jwt')
      if (!token) {
        throw new Error('JWT token not found')
      }

      dispatch({ type: DELETE_PRODUCTBYID_REQUEST })

      const response = await fetch(`http://localhost:8080/api/v1/products/delete/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        dispatch({
          type: DELETE_PRODUCTBYID_SUCCESS,
          payload: id,
        })
      } else {
        dispatch({
          type: DELETE_PRODUCTBYID_FAILURE,
          error: 'failed to fetch',
        })
      }
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCTBYID_FAILURE,
        error: 'failed to fetch',
      })
    }
  }
}
