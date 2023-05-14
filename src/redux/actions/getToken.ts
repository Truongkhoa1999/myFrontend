// Variables

export enum AuthenticateTypes {
  SET_TOKEN = 'SET_TOKEN',
  SET_WARNING = 'SET_WARNING',
}
export const setToken = (token: string) => ({
  type: AuthenticateTypes.SET_TOKEN,
  payload: token,
})
export const setWarning = (isWarning: boolean) => ({
  type: AuthenticateTypes.SET_WARNING,
  payload: isWarning,
})
