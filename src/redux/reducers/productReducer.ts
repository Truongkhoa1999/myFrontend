import { AnyAction } from 'redux'
import { pushItemToCart } from '../../logicfx/productUtil'

// From actions
import {
  ADD_CART,
  DECREASE_QUANTITY,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  INCREASE_QUANTITY,
  ProductResponse,
  ProductState,
  SAVE_CART,
} from '../actions/products'

const savedCart = localStorage.getItem('cart')

export interface stateProps {
  products: ProductState
  isLoading: boolean
  error: Error | null
  cart: CartProps[]
}

export type CartProps = {
  quantity: number
  id: number
}

// init state value
const initialState: stateProps = {
  products: {
    total: 0,
    skip: 0,
    limit: 0,
    data: [],
  },
  isLoading: false,
  error: null,
  cart: savedCart ? JSON.parse(savedCart) : [],
}

//  Reducer
export function productReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST: {
      console.log('Is requesting database')
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_PRODUCTS_SUCCESS: {
      console.log('Data has been fetched perfectly')
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      }
    }
    case FETCH_PRODUCTS_FAILURE: {
      console.log('API errored')
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }
    case ADD_CART: {
      return {
        ...state,
        cart: pushItemToCart(state.cart, action.payload),
      }
    }
    case INCREASE_QUANTITY: {
      const productId = action.payload
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
      return {
        ...state,
        cart: updatedCart,
      }
    }
    case DECREASE_QUANTITY: {
      const productId = action.payload
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item
      })
      return {
        ...state,
        cart: updatedCart,
      }
    }
    case SAVE_CART: {
      localStorage.setItem('cart', JSON.stringify(state.cart))
      return state
    }

    default:
      return state
  }
}
