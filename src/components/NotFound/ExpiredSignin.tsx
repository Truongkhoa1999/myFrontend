import'./style/NotFound.scss'
import { useNavigate } from 'react-router-dom'
const ExpiredSignin = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">402</h1>
      <p className="not-found-text">your login session has expired</p>
      <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*oTOmPQFJQSOHrYHWnxytgA.png"></img>
      <div className="buttons">
        <button onClick={() => navigate('/signin')} className="signin">
          Sign in
        </button>
        <button className="signup">Sign up</button>
      </div>
    </div>
  )
}

export default ExpiredSignin
