import { Dispatch } from 'redux'
import jwtDecode from 'jwt-decode'
import { CartProps } from '../../type/Cart/CartProps'
import { DecodedToken } from '../../type/DecodedToken/DecodedToken'

// Variables
export const FETCH_CARTBYUSERID_REQUEST = 'FETCH_CARTBYUSERID_REQUEST'
export const FETCH_CARTBYUSERID_SUCCESS = 'FETCH_CARTBYUSERID_SUCCESS'
export const FETCH_CARTBYUSERID_FAILURE = 'FETCH_CARTBYUSERID_FAILURE'

// SEND REQUEST
export interface fetchCartByUserIdRequestAction {
  type: typeof FETCH_CARTBYUSERID_REQUEST
}

// SUCCESS
export interface fetchCartByUserIdSuccessAction {
  type: typeof FETCH_CARTBYUSERID_SUCCESS
  payload: CartProps
}

// Action Failure
export interface fetchCartByUserIdFailureAction {
  type: typeof FETCH_CARTBYUSERID_FAILURE
  error: Error | string
}

// Action HUB
export type CartByUserIdActionTypes =
  | fetchCartByUserIdRequestAction
  | fetchCartByUserIdSuccessAction
  | fetchCartByUserIdFailureAction

// Fetch cart by user ID
export const getCartByUserId = () => async (dispatch: Dispatch<CartByUserIdActionTypes>) => {
  dispatch({ type: FETCH_CARTBYUSERID_REQUEST })
  try {
    const token = localStorage.getItem('jwt')
    const decodedToken = token ? (jwtDecode(token) as DecodedToken) : null
    const userId = decodedToken?.userId

    const expirationTime = decodedToken?.exp || 0 // Get the expiration time from the decoded JWT
    const currentTime = Math.floor(Date.now() / 1000) // Convert current time to seconds
    if (currentTime > expirationTime) {
      // Token has expired, handle accordingly
      throw new Error('expired JWT')
      return
    }
    if (!token || !userId) {
      throw new Error('JWT token or user ID not found')
    }
    // Check if the token has expired

    const url = `http://localhost:8080/api/v1/carts/${userId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    dispatch({
      type: FETCH_CARTBYUSERID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error fetching cart';
    dispatch({
      type: FETCH_CARTBYUSERID_FAILURE,
      error: errorMessage,
    })
  }
}
