import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../styles/LoginSingup.scss'

const SignupPage = ({ setUser }) => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const navigate = useNavigate()

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
            res.json().then((user) => setUser(user))
            navigate('/profile')
            console.log(formData)
         } else {
            res.json().then((data) => alert(data.error))
         }
      })
   })

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