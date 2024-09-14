import axios from 'axios';
const API_URL = 'http://localhost:5000/api/character';

export const createCharacter = async (characterData) => {
  const token = localStorage.getItem('token'); // Ensure the token is stored correctly
  try {
    console.log('Sending data:', characterData); // Log the data being sent to the backend
    const response = await axios.post(`${API_URL}/create-character`, characterData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in character Creation:', error); // Log any error that occurs
    throw error.response.data;
  }
};
