import axios from "axios";
import { store } from "../app/store";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// Attach the in-memory access token (if any) to every request.
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
