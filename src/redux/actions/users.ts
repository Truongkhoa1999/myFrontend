import { Dispatch } from 'redux'
import { User } from '../../type/User/User'

// variables
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const BAN_USER = 'BAN_USER'
// not relevant
export const LOCAL_USERS_KEY = 'users'
export const LOCAL_USER = 'user_'

export interface UserResponse {
  total: number
  skip: number
  limit: number
  users: User[]
}

export interface UserState {
  data: User[]
  total: number
  skip: number
  limit: number
}

//actions
//action request
export function fetchDataRequest() {
  return {
    type: FETCH_DATA_REQUEST,
  }
}
// action success
export function fetchDataSuccess(response: UserState) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: response,
  }
}
// action failure
export function fetchDataFailure(error: Error) {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  }
}

// Ban user
export const banUser = (id: number) => {
  return {
    type: BAN_USER,
    payload: id,
  }
}

// Action fetchUsers
export function fetchUsers() {
  return async (dispatch: Dispatch) => {
    dispatch(fetchDataRequest())
    let usersRes: UserResponse
    let usersLocal: UserState
    try {
      // Get from local storage
      usersLocal = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || 'null')
      dispatch(fetchDataSuccess(usersLocal))
      // if local doesnt exist => fetch and store in local storage
      if (!usersLocal) {
        const response = await fetch('https://dummyjson.com/users')
        usersRes = await response.json()
        const userEdited = mapUserFromResponseToReduxState(usersRes)
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(userEdited))
        dispatch(fetchDataSuccess(userEdited))
      }
    } catch (error) {
      dispatch(fetchDataFailure(error as Error))
    }
  }
}

export const mapUserFromResponseToReduxState = (userRes: UserResponse): UserState => {
  // Solution 1
  // const { users, ...rest } = userRes
  // return { data: users, ...rest }

  // Solution2
  const { total, skip, limit, users } = userRes
  return { total, skip, limit, data: users }
}
