// axios-setup.ts
import axios from "axios";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

axios.interceptors.request.use(
  (config) => {
    const token = authStore.token || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
