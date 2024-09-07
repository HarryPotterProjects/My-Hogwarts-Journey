import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
function Login() {
  return (
        <div className='wrapper'>
            <div className="title">
                Welcome back to Hogwarts
            </div>
            <div className="login-container">
                    <input className="login-credentials" type="text" placeholder='Username'/>
                    <input className="login-credentials" type="password" placeholder='Password'/>
            </div>
            <input className="login-submit" type="submit" value="Login"/>
            <Link to="/signup" className='switching-signup'>
            <button className="create-account">Create an Account</button>
            </Link>
        </div>     
  )
}
export default Login