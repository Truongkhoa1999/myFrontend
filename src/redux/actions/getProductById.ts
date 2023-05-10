import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'react'
import { ProductProps } from '../../type/Product/ProductProps'

// Variables
export const FETCH_PRODUCTBYID_REQUEST = 'FETCH_PRODUCTBYID_REQUEST'
export const FETCH_PRODUCTBYID_SUCCESS = 'FETCH_PRODUCTBYID_SUCCESS'
export const FETCH_PRODUCTBYID_FAILURE = 'FETCH_PRODUCTBYID_FAILURE'

// SEND REQUEST
export interface fetchProductByIdRequestAction {
  type: typeof FETCH_PRODUCTBYID_REQUEST
}
// SUCCESS
export interface fetchProductByIdSuccessAction {
  type: typeof FETCH_PRODUCTBYID_SUCCESS
  payload: ProductProps
}
// Action Failure
export interface fetchProductByIdFailureAction {
  type: typeof FETCH_PRODUCTBYID_FAILURE
  error: string
}
// Action HUB
export type ProductByIdActionTypes =
  | fetchProductByIdRequestAction
  | fetchProductByIdSuccessAction
  | fetchProductByIdFailureAction

// Fetch products by Id
export const getProductsById =
  (id: ReturnType<typeof uuidv4>) => async (dispatch: Dispatch<ProductByIdActionTypes>) => {
    dispatch({ type: FETCH_PRODUCTBYID_REQUEST })
    try {
      const response = await fetch(`http://localhost:8080/api/v1/products/id/${id}`)
      const data = await response.json()
      dispatch({
        type: FETCH_PRODUCTBYID_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTBYID_FAILURE,
        error: 'failed to fetch',
      })
    }
  }
