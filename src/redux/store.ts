import { configureStore } from '@reduxjs/toolkit'
import getProductByIdReducer from './reducers/getProductByIdReducer'
import { cartReducer } from './reducers/cartReducer'
import { getTokenReducer } from './reducers/getTokenReducer'
import { getProductsReducer } from './reducers/getProductsReducer'
import getCartByUserIdReducer from './reducers/getCartByUserIdReducer'
export const store = configureStore({
  reducer: {
    products: getProductsReducer,
    productById: getProductByIdReducer,
    token: getTokenReducer,
    cart: cartReducer,
    cartByUserId: getCartByUserIdReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
