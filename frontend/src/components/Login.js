import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './Login.css'
import hogwartsLogo from '../medias/background.png'; 
import { login } from '../api/auth';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password });
      localStorage.setItem('token', data.token); // Save token in localStorage
      navigate('/dashboard', { state: { username } }); // Redirect to the dashboard or another protected route
    } catch (err) {
      setError(err.msg); // Display error message
    }
  };
  return (
        <div className='wrapper'>
            <div className="title">
                Welcome back to Hogwarts
            </div>
            <img src={hogwartsLogo} alt="Hogwarts Logo" width={250}/>
            <div className="login-container">
                    <input className="login-credentials" 
                           type="text" placeholder='Username' 
                           value={username} 
                           onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className="login-credentials" 
                           type="password" placeholder='Password' 
                           value={password} 
                           onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <button className="login-submit" 
                    onClick={handleSubmit}>Login
            </button>
            {error && <p className="error-message">{error}</p>}
            <Link to="/signup" className='switching-signup'>
            <button className="create-account">Create an Account</button>
            </Link>
        </div>     
  )
}
export default Login