import { Dispatch } from 'react'
import { ProductProps } from '../../type/Product/ProductProps'
import { RequestProductProps } from '../../type/Product/RequestProductProps'

// Variables
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST'
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'

// Action types
export interface AddProductRequestAction {
  type: typeof ADD_PRODUCT_REQUEST
}

export interface AddProductSuccessAction {
  type: typeof ADD_PRODUCT_SUCCESS
  payload: ProductProps
}

export interface AddProductFailureAction {
  type: typeof ADD_PRODUCT_FAILURE
  error: string
}

// Action creators
export const addProductRequest = (): AddProductRequestAction => ({
  type: ADD_PRODUCT_REQUEST,
})

export const addProductSuccess = (product: ProductProps): AddProductSuccessAction => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
})

export const addProductFailure = (error: string): AddProductFailureAction => ({
  type: ADD_PRODUCT_FAILURE,
  error,
})

// Union type for all action types
export type AddProductActionTypes =
  | AddProductRequestAction
  | AddProductSuccessAction
  | AddProductFailureAction

export const addProduct = (productData: RequestProductProps) => {
  return async (dispatch: Dispatch<AddProductActionTypes>) => {
    // Get token and check
    const token = localStorage.getItem('jwt')
    if (!token) {
      throw new Error('JWT token not found')
    }
    dispatch(addProductRequest())
    try {
      const response = await fetch('https://fs14-ecommerce.herokuapp.com/api/v1/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })
      if (!response.ok) {
        throw new Error('Failed to add product')
      }
      const product: ProductProps = await response.json()
      dispatch(addProductSuccess(product))
    } catch (error) {
      dispatch(addProductFailure('failed to add products'))
    }
  }
}
