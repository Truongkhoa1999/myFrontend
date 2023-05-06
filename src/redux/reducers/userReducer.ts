import { AnyAction } from 'redux'
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  UserResponse,
  UserState,
  BAN_USER,
  LOCAL_USERS_KEY,
} from '../actions/users'
import { User } from '../../type/User/User'
import { handleBanUsers } from '../../logicfx/userUtil'

export interface stateProps {
  users: UserState
  isLoading: boolean
  error: Error | null
}
//init state value

const initialState: stateProps = {
  users: {
    total: 0,
    skip: 0,
    limit: 0,
    data: [],
  },
  isLoading: false,
  error: null,
}
// Reducer
export function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true }
    case FETCH_DATA_SUCCESS:
      return { ...state, users: action.payload, isLoading: false }
    case FETCH_DATA_FAILURE:
      return { ...state, error: action.payload, isLoading: false }
    case BAN_USER:
      const newData = handleBanUsers(action.payload, state.users.data)
      console.log('newData > ', newData)
      const newUsers = { ...state.users, data: newData }
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(newUsers))
      return { ...state, users: newUsers }
    default:
      return state
  }
}
