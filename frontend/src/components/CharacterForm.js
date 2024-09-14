import React, { useState } from 'react';
import { createCharacter } from '../api/character';
import './CharacterForm.css';

function CharacterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError('');
    setSuccess('');
  
    try {
      if (!firstname || !lastname) {
        setError('Firstname and Lastname are required');
        return;
      }
  
      const characterData = {
        firstname,
        lastname
      };
  
      const response = await createCharacter(characterData);
  
      if (response.success) {
        setSuccess('Character created successfully!');
      } else {
        setError(response.message || 'Failed to create character');
        console.error('Response message:', response.message); // Log the error message
      }
  
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while creating the character');
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
