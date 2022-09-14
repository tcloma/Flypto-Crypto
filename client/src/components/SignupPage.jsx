import React, { useState } from "react"
import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom";
// import LoginPage from './LoginPage';
import '../styles/LoginSingup.scss'
// import axios from "axios"


const SignupPage = ({ onLogin }) => {
  // const {name, last_name, email, username, password} = onLogin
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [errors, setErrors] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  

  const handleSubmit = ((e) => {
    e.preventDefault()
    const formData = {
      'name': `${firstName} ${lastName}`,
      'email': email,
      'password': password
    }
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => onLogin(user))
      }
    })
    // .then((res) => res.json())
    // .then(user => onLogin(user))
    // console.log(formData)
  })

  // const handleSubmit = ((e) => {
  //   // setFirstName('')
  //   // setLastName('')
  //   // setEmail('')
  //   // setPassword('')
  //   // setUsername('')

  //   e.preventDefault()
  //     fetch('http:/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: firstName,
  //       last_name: lastName,
  //       email: email,
  //       username: username,
  //       password: password
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then(data => console.log(data))
  //     // .then(data => setSignUp(data))
  // }, [])



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign up</h1>
        </div>
        <div className="signup-name">
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type='text'
            placeholder="First Name"
          />
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type='text'
            placeholder="Last Name"
          />
        </div>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='text'
          placeholder="Email"
        />
        {/* ******* Adding username input ******* */}
        {/* <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
        /> */}
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder="Password"
        />
        <button> Submit </button>
      </form>
      <div className="redirect-text">
        <p> Already have an account? <Link to='/login'>Login</Link> </p>
      </div>
    </div>
  )
}
export default SignupPage