import axios from "axios";
 

console.log('Vite API URL:', process.env.VITE_API_URL);
 // Check the value of your base URL

const API = axios.create({
  baseURL: process.env.VITE_API_URL, // This will now have the full URL
});



API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
