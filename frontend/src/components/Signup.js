import React from 'react'
import { Link } from 'react-router-dom';
import './Signup.css'
import hogwartsLogo from '../medias/background.png'; 
function Signup() {
  return (
    <div className="wrapper">
        <div className="title">
            Welcome to Hogwarts
        </div>
        <img src={hogwartsLogo} alt="Hogwarts Logo" width={250}/>
        <div className="signup-container">
            <input className='signup-credentials' type="text" placeholder='Username'/>
            <input className='signup-credentials' type="password" placeholder='Password'/>
            <input className='signup-credentials' type="password" placeholder='Re-enter Password'/>
        </div>
        <input className="signup-submit" type="submit" value="Sign Up"/>
        <Link to="/login" className='switching-login'>
        <button className="login-account">Already have an Account</button>
        </Link>

    </div>
  )
}

export default Signup