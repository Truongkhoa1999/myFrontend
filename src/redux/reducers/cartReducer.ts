import {
  ADD_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SAVE_CART,
  LOCAL_CART_KEY,
} from '../actions/cart'
import { AnyAction } from 'redux'
import { CartProps } from '../../type/Cart/CartProps'
export interface cartState {
  cart: CartProps[]
}
const savedCart = localStorage.getItem('cart')
const initialState: cartState = {
  cart: savedCart ? JSON.parse(savedCart) : [],
}
export const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_CART: {
      // Try the new immplements
      const newItem = action.payload
      const updatedCart = [...state.cart, newItem]
      return {
        ...state,
        cart: updatedCart,
      }
    }
    case INCREASE_QUANTITY: {
      const productId = action.payload
      const updatedCart = state.cart.map((item) => {
        if (item.cartId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
      console.log('yes I did add for u')
      return {
        ...state,
        cart: updatedCart,
      }
    }
    case DECREASE_QUANTITY: {
      const productId = action.payload
      const updatedCart = state.cart.map((item) => {
        if (item.cartId === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item
      })
      console.log('yes I did add for u')
      return {
        ...state,
        cart: updatedCart,
      }
    }
    case SAVE_CART: {
      const cartItems = action.payload
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems))
      return {
        ...state,
        cart: cartItems,
      }
    }
    default:
      return state
  }
}
