// From Redux
import { Dispatch } from 'redux'
//  data Product type
import { ProductProps } from '../../type/Product/ProductProps'

// Variables
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

// SEND REQUEST
export interface fetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST
}
// SUCCESS
export interface fetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS
  payload: ProductProps[]
}
// Action Failure
export interface fetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE
  error: string
}
// Action HUB
export type ProductActionTypes =
  | fetchProductsRequestAction
  | fetchProductsSuccessAction
  | fetchProductsFailureAction

//Get all products
export const fetchProducts = () => async (dispatch: Dispatch<ProductActionTypes>) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST })
  try {
    const response = await fetch('http://localhost:8080/api/v1/products/')
    const data = await response.json()
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      error: 'failed to fetch',
    })
  }
}
