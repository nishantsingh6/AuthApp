import axios from "axios";
 

console.log('Vite API URL:', process.env.VITE_API_URL);
 // Check the value of your base URL

const API = axios.create({
  baseURL:"https://auth-app-bmpl.onrender.com/api/v1/authApp", // This will now have the full URL
});



API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
