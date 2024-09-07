import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './Signup.css'
import hogwartsLogo from '../medias/background.png'; 
import { register } from '../api/auth';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log({ username, password, confirmPassword }); // Add this line
    try {
      await register({ username, password });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error'); // Display error message
    }
  };  
  return (
    <div className="wrapper">
        <div className="title">
            Welcome to Hogwarts
        </div>
        <img src={hogwartsLogo} alt="Hogwarts Logo" width={250}/>
        <div className="signup-container">
            <input className='signup-credentials' 
                   type="text" placeholder='Username'
                   value={username} 
                   onChange={(e) => setUsername(e.target.value)}
            />
            <input className='signup-credentials' 
                   type="password" placeholder='Password'
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)}/>
            <input className='signup-credentials' 
                   type="password" placeholder='Re-enter Password'
                   value={confirmPassword} 
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   />
        </div>
        <button className="signup-submit" onClick={handleSubmit}>
        Sign Up
      </button>
      {error && <p className="error-message">{error}</p>}
      <Link to="/login" className='switching-login'>
        <button className="login-account">Already have an Account</button>
      </Link>
    </div>
  )
}

export default Signup