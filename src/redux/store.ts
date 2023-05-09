import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './reducers/productsReducer'

import { userReducer } from './reducers/userReducer'
import { produxReducer } from './reducers/produxReducer'
import productByIdReducer from './reducers/productByIdReducer'
export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    productById: productByIdReducer,
    produx: produxReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
