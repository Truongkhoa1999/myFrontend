import { Dispatch } from 'redux'
import { v4 as uuidv4 } from 'uuid'
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const FETCH_PRODUCTBYID_SUCCESS = 'FETCH_PRODUCTBYID_SUCCESS'
export interface Product {
  id: string
  title: string
  price: number
  quantity: number
  brand: string
  description: string
  thumbnail: string
  images: string[]
  category: {
    categoryId: string
    title: string
  }
  removed: boolean
}

export interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST
}

export interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS
  payload: Product[]
}

export interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE
  error: string
}
export interface FetchProductByIdSuccess {
  type: typeof FETCH_PRODUCTBYID_SUCCESS
  payload: Product
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | FetchProductByIdSuccess
// Fetch all products
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
// Fetch products by Id
export const fetchProductsById =
  (id: ReturnType<typeof uuidv4>) => async (dispatch: Dispatch<ProductActionTypes>) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST })
    try {
      const response = await fetch(`http://localhost:8080/api/v1/products/id/${id}`)
      const data = await response.json()
      dispatch({
        type: FETCH_PRODUCTBYID_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        error: 'failed to fetch',
      })
    }
  }
// Update products quantity
