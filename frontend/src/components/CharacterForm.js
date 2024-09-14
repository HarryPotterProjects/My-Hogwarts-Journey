import React, { useState, useEffect } from 'react';
import { createCharacter, getUserById } from '../api/character';
import './CharacterForm.css';

function CharacterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getUserById('me'); // Fetch user data with 'me' as a placeholder
        setUserId(response.id);
        console.error("UserID : ",response.id);
      } catch (err) {
        console.error('Failed to fetch user ID', err);
      }
    };
    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await createCharacter({ firstname, lastname, userId });
      setSuccess('Character created successfully!');
      setFirstname('');
      setLastname('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Server error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='character-form'>
        <input
          className='character-input'
          id="firstname"
          type="text"
          placeholder='Firstname'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className='character-input'
          id="lastname"
          type="text"
          placeholder='Lastname'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <button className="create-character" type="submit">Create Character</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default CharacterForm;
