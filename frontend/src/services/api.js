import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Automatically attach JWT token to every protected request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auto-logout on expired/invalid JWTs (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isProfileRequest = error.config && error.config.url && error.config.url.includes("/auth/profile");
      
      localStorage.removeItem("task-tracker-token");
      
      if (!isProfileRequest) {
        localStorage.setItem("task-tracker-session-expired", "true");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;