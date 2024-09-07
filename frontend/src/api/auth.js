// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
  try {
    console.log('Sending data:', userData); // Log the data being sent to the backend
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error in register:', error); // Log any error that occurs
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
