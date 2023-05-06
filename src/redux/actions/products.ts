// From Redux
import { Dispatch } from 'redux'

//  data Product type
import { Product } from '../../type/Products/products'
import { fetchDataSuccess } from './users'

// Variables
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const ADD_CART = 'ADD_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const SAVE_CART = 'SAVE_CART'

// Local storage key
export const LOCAL_PRODUCT_KEY = 'products'
export const LOCAL_PRODUCT = 'products_'
// ProductResponse interface
export interface ProductResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
export interface ProductState {
  data: Product[]
  total: number
  skip: number
  limit: number
}

export type CartProps = {
  id: number
  quantity: number
}
// Actions
export function fetchProductsRequest() {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  }
}
// Action Success
export function fetchProductsSuccess(response: ProductState) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: response,
  }
}
// Action Failure
export function fetchProductsFailure(error: Error) {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  }
}
// Action fetch
// export function fetchProducts() {
//   return async (dispatch: Dispatch) => {
//     dispatch(fetchProductsRequest())
//     try {
//       const response = await fetch('https://dummyjson.com/products')
//       const productRes = await response.json()
//       const { total, skip, limit, products } = productRes
//       if (!response.ok) throw productRes
//       // dispatch(fetchDataSuccess({total, skip, limit, data: products}))
//       dispatch(fetchProductsSuccess({ total, skip, limit, data: products }))
//     } catch (error) {
//       dispatch(fetchProductsFailure(error as Error))
//     }
//   }
// }
export function fetchProducts() {
  return async (dispatch: Dispatch) => {
    dispatch(fetchProductsRequest())
    let productsRes: ProductResponse
    let productsLocal: ProductState
    try {
      // Get from local storage
      productsLocal = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_KEY) || 'null')
      dispatch(fetchProductsSuccess(productsLocal))
      // If local doesnt exist start fetching and set agin
      if (!productsLocal) {
        const respone = await fetch('https://dummyjson.com/products')
        productsRes = await respone.json()
        const productEdited = mapProductFromResponseToReduxState(productsRes)
        localStorage.setItem(LOCAL_PRODUCT_KEY, JSON.stringify(productEdited))
        dispatch(fetchProductsSuccess(productEdited))
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error as Error))
    }
  }
}

// Add cart
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
// We map over the products response and edit it format a bit
export const mapProductFromResponseToReduxState = (productRes: ProductResponse): ProductState => {
  const { total, skip, limit, products } = productRes
  return { total, skip, limit, data: products }
}
