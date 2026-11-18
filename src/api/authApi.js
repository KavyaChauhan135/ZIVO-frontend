import { API_BASE_URL, axiosInstance } from "../config/axiosInstance";

// Full-page navigation target (OAuth can't be done over XHR).
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/auth/google`;

export const loginApi = async (payload) =>
  (await axiosInstance.post("/auth/login", payload)).data;

export const registerApi = async (payload) =>
  (await axiosInstance.post("/auth/register", payload)).data;

export const forgotPasswordApi = async (payload) =>
  (await axiosInstance.post("/auth/forgot-password", payload)).data;

export const resetPasswordApi = async (payload) =>
  (await axiosInstance.post("/auth/reset-password", payload)).data;

export const refreshApi = async () =>
  (await axiosInstance.post("/auth/refresh")).data;

export const getMeApi = async (accessToken) =>
  (
    await axiosInstance.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  ).data;
