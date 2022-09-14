// import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/LoginSingup.scss'

const LoginPage = ({setCurrentUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      'email': email,
      'password': password
    }

    fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user)
          console.log("USER: ", user)
        })
        navigate('/')
      }
    })
    };

  const handleemailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={e => handleSubmit(e)}>
        <div className="form-header">
          <h1>Log in</h1>
        </div>
        <input
          value={email}
          onChange={handleemailChange}
          type='text'
          placeholder="email"
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          type='password'
          placeholder="Password"
        />
        <button> Submit </button>
      </form>
      <div className="redirect-text">
        <p> Don't have an account? <Link to='/signup'>Signup</Link> </p>
      </div>
    </div>
  )
}
export default LoginPage