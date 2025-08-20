import axios, { type InternalAxiosRequestConfig } from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
});

// add a header to every request
api.interceptors.request.use((config): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (userId) {
    config.headers["X-User-ID"] = userId;
  }
  return config;
});

export const getActivities = () => api.get("/activities");
export const getActivityById = (id: string) => api.get(`/activities/${id}`);
export const addActivity = (activity: object) => api.post("/activities", activity);
export const getActivityRecommendation = (id: string) => api.get(`/recommendations/activity/${id}`);
