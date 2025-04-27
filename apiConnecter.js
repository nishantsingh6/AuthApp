import axios from "axios";
 

const API = axios.create({
  baseURL: process.env.API_URL, // Updated base URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
