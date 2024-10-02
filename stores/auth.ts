// stores/auth.ts
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<{ _id: string } | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      token.value = res.data.token;
      user.value = res.data.user;

      // Save token and user data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name: string, username: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        username,
        password,
      });
      return res.data; // Return user data or success message
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;

    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const initializeAuth = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  };

  return { token, user, login, register, logout, initializeAuth };
});
