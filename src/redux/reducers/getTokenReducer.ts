import { AuthenticateTypes } from '../actions/getToken'

interface tokenState {
  token: string | null
  isWarning: boolean
}
const initialState: tokenState = {
  token: null,
  isWarning: false,
}
export const getTokenReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AuthenticateTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case AuthenticateTypes.SET_WARNING:
      return {
        ...state,
        isWarning: action.payload,
      }
    default:
      return state
  }
}
