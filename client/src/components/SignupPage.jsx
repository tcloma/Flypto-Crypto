import React, { useState } from "react"
import { Link } from "react-router-dom" 
import '../styles/LoginSingup.scss'


const SignupPage = () => {
  // const {name, last_name, email, username, password} = onLogin
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [signUp, setSignUp] = useState([])


  // const handleSubmit = ((e) => {
  //   e.preventDefault()
  //   const formData = {
  //     'name': `${firstName} ${lastName}`,
  //     'email': email,
  //     'password': password
  //   }
  //   fetch('/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({formData})
  //   })
  //   .then((res) => res.json())
  //   .then((data) => setSignUp(data))
  //   console.log(formData)
  // }, [])

  const handleSubmit = ((e) => {
    // setFirstName('')
    // setLastName('')
    // setEmail('')
    // setPassword('')
    // setUsername('')

    e.preventDefault()
      fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password_digest: password
      })
    })
      .then((res) => res.json())
      .then(data => console.log(data))
      // .then(data => setSignUp(data))
  }, [])



  return (
    <div className="login-container">
      <form className="login-form">
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
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder="Password"
        />
        <button onSubmit={e => handleSubmit(e)}> Submit </button>
      </form>
      <div className="redirect-text">
        <p> Already have an account? <Link to='/login'>Login</Link> </p>
      </div>
    </div>
  )
}
export default SignupPage