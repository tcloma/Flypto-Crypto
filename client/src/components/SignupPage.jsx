import { Link } from "react-router-dom"
import '../styles/LoginSingup.scss'


const SignupPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={e => handleSubmit(e)}>
        <div className="form-header">
          <h1>Sign up</h1>
        </div>
        <div className="signup-name">
          <input type='text' placeholder="First Name" />
          <input type='text' placeholder="Last Name" />
        </div>
        <input type='text' placeholder="Email" />
        <input type='password' placeholder="Password" />
        <button> Submit </button>
      </form>
      <div className="redirect-text">
        <p> Already have an account? <Link to='/login'>Login</Link> </p>
      </div>
    </div>
  )
}
export default SignupPage