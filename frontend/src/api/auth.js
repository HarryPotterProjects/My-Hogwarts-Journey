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
    localStorage.setItem('token', response.data.token); // Ensure this line sets the token correctly
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getUserById = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error.response.data;
  }
};
