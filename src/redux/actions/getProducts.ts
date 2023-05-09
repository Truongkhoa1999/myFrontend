// From Redux
import { Dispatch } from 'redux'
//  data Product type
import { ProductProps } from '../../type/Products/ProductProps'

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
// CARDS PLS BRING TO ANOTHER FILE
export const ADD_CART = 'ADD_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const SAVE_CART = 'SAVE_CART'
export type CartProps = {
  id: number
  quantity: number
}
// Add cart
export interface addItemToCart {
  type: typeof ADD_CART
  payload: CartProps
}
export interface increaseQuantity {
  type: typeof INCREASE_QUANTITY
  payload: {
    productId: number
    quantity: number
  }
}
export const addItemToCart = (id: number) => {
  return {
    type: ADD_CART,
    payload: id,
  }
}
// update quantity
export const increaseQuantity = (productId: number) => {
  return {
    type: INCREASE_QUANTITY,
    payload: productId,
  }
}

export const decreaseQuantity = (productId: number) => {
  return {
    type: DECREASE_QUANTITY,
    payload: productId,
  }
}
// save cart for users
export function saveCart(cart: CartProps[]) {
  return {
    type: SAVE_CART,
    payload: cart,
  }
}
// <>><<>>
