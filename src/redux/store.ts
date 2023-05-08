import { configureStore } from '@reduxjs/toolkit'

import productReducer from './reducers/productsReducer'
import selectedProductReducer from './reducers/selectedProductReducer'
export const store = configureStore({
  reducer: {
    products: productReducer,
    selectedProduct: selectedProductReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
