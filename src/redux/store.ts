import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './reducers/productsReducer'

import productByIdReducer from './reducers/productByIdReducer'
import { cartReducer } from './reducers/cartReducer'

export const store = configureStore({
  reducer: {
    products: productReducer,
    productById: productByIdReducer,
    cart: cartReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
