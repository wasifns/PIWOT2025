import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',  // Backend server URL (adjust if different)
});

export default instance;
