// CARDS PLS BRING TO ANOTHER FILE
import { CartProps } from '../../type/Cart/CartProps'

export const ADD_CART = 'ADD_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const SAVE_CART = 'SAVE_CART'
// Local storage key
export const LOCAL_CART_KEY = 'cart'
export const LOCAL_CART = 'cart_'
// Add cart

export interface increaseQuantity {
  type: typeof INCREASE_QUANTITY
  payload: {
    productId: number
    quantity: number
  }
}
export const addItemToCart = (cartItem: CartProps) => {
  return {
    type: ADD_CART,
    payload: cartItem,
  }
}
// update quantity
export function increaseQuantity(productId: string) {
  return {
    type: INCREASE_QUANTITY,
    payload: productId,
  }
}

export function decreaseQuantity(productId: string) {
  return {
    type: DECREASE_QUANTITY,
    payload: productId,
  }
}
// save cart for users
export function saveCart(cart: CartProps[]) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart))
  return {
    type: SAVE_CART,
    payload: cart,
  }
}
// <>><<>>
