import React from 'react'
import './Login.css'
function Login() {
  return (
        <div className='wrapper'>
            <div className="title">
                Welcome back to Hogwarts
            </div>
            <div className="login-container">
                <div className="login-credentials-container">
                    <input className="login-credentials" type="text" placeholder='Username'/>
                    <input className="login-credentials" type="password" placeholder='Password'/>
                </div>
                <input className="login-submit" type="submit" value="Login"/>
            </div>
            <button className="create-account">Create an Account</button>
    
        </div>     
  )
}
export default Login