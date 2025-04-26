import axios from "axios";

require('dotenv').config(); 

const API = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000/api/v1/authApp", // Updated base URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
