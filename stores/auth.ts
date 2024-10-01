import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: useLocalStorage("user", null),
    token: useLocalStorage("token", null),
  }),
  actions: {
    async register(formData: { name: string; username: string; password: string }) {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Get the JSON response

      if (!res.ok) {
        console.error("Registration error:", data.error); // Log the error message
        throw new Error("Registration failed");
      }

      this.user = data.user;
      this.token = data.token;
    },
    async login(formData: { username: string; password: string }) {
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data = await res.json();
        this.user = data.user;
        this.token = data.token;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Login error:", error.message);
        } else {
          console.error("Login error:", String(error));
        }
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
