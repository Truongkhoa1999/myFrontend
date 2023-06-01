import { AuthenticateTypes, setToken, setWarning } from '../redux/actions/getToken'
export const signup = (username: string, password: string, firstname:string, avatar:string, navigate: Function) => {
  return async (dispatch: any) => {
    try {
      // 'https://localhost:8080/signup'
      const response = await fetch('https://fs14-ecommerce.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          firstName:firstname,
          avatar
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
      console.log('Sign-up failed:', error)
      dispatch(setWarning(false))
    }
  }
}
