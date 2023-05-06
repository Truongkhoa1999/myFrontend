import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './reducers/productReducer'

import { userReducer } from './reducers/userReducer'
import { produxReducer } from './reducers/produxReducer'
export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    produx: produxReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
