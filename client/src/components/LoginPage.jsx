import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/LoginSingup.scss'


const LoginPage = ({ setUser }) => {
   const [password, setPassword] = useState('')
   const [email, setEmail] = useState('')

   let navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = {
         'email': email,
         'password': password
      }
      fetch('/login', {
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
            // } else {
            //   res.json().then((err) => setErrors(err.errors))
            // }
         }
      })
      // .then(res => res.json())
      // .then(user => setUser(user))
   }

   const handleEmailChange = (e) => {
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
               onChange={handleEmailChange}
               type='text'
               placeholder="Email"
            />
            <input
               value={password}
               onChange={handlePasswordChange}
               type='password'
               placeholder="Password"
            />
            {/* {
          errors.length > 0 && (
            <ul style={{ color: 'red' }}>
              {errors.map((error) => (
                <li key={error}> {error}</li>
              ))}
            </ul>
          )
        } */}
            <button> Submit </button>
         </form>
         <div className="redirect-text">
            <p> Don't have an account? <Link to='/signup'>Signup</Link> </p>
         </div>
      </div>
   )
}
export default LoginPage