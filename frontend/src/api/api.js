import axios from 'axios';

// Create a custom Axios instance with the base backend URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;