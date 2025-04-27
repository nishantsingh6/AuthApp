import axios from "axios";
 

const API = axios.create({
  baseURL: "https://auth-app-bmpl.onrender.com/api/v1/authApp", // Updated base URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
