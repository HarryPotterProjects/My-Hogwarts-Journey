import React, { useState, useEffect } from 'react';
import { createCharacter } from '../api/character';
import './CharacterForm.css';

function CharacterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <div>
      <form onSubmit={/>/} className='character-form'>
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
