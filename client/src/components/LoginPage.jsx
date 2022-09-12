import { Link } from "react-router-dom";
import '../styles/LoginSingup.scss'

const LoginPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={e => handleSubmit(e)}>
        <div className="form-header">
          <h1>Log in</h1>
        </div>
        <input type='text' placeholder="Username" />
        <input type='password' placeholder="Password" />
        <button> Submit </button>
      </form>
      <div className="redirect-text">
        <p> Don't have an account? <Link to='/signup'>Signup</Link> </p>
      </div>
    </div>
  )
}
export default LoginPage