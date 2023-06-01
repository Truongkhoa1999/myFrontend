import { AuthenticateTypes, setToken, setWarning } from '../redux/actions/getToken'
export const signin = (username: string, password: string, navigate: Function) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('https://fs14-ecommerce.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        const { token } = data
        // localStorage.setItem('jwt',token)
        dispatch(setToken(token))
        localStorage.setItem('jwt', token)
        navigate('/homepage')
      } else {
        console.log('Sign-in failed:', data.message)
        dispatch(setWarning(true))
      }
    } catch (error) {
      console.log('Sign-in failed:', error)
      dispatch(setWarning(false))
    }
  }
}
