import axios from 'axios';

const API_URL = 'http://localhost:5000/api/character';
export const createCharacter = async (characterData) => {
  try {
    const token = localStorage.getItem('token'); // Fetch token from localStorage
    const response = await axios.post(API_URL, characterData, {
      headers: {
        Authorization: `Bearer ${token}` // Attach the token to the request
      }
    });

    return response.data;
  } catch (err) {
    console.error('Error creating character:', err);
    return { success: false, message: err.response ? err.response.data.msg : 'Unknown error' };
  }
};
