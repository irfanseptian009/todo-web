import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: useLocalStorage("user", null),
    token: useLocalStorage("token", null),
  }),
  actions: {
    async register(formData: { name: string; username: string; password: string }) {
      const {
        public: { apiBaseUrl },
      } = useRuntimeConfig();
      const res = await axios.post(`${apiBaseUrl}/auth/register`, formData);

      this.user = res.data.user;
      this.token = res.data.token;
    },

    async login(formData: { username: string; password: string }) {
      const {
        public: { apiBaseUrl },
      } = useRuntimeConfig();
      const res = await axios.post(`${apiBaseUrl}/auth/login`, formData);

      this.user = res.data.user;
      this.token = res.data.token;
    },

    logout() {
      this.user = null;
      this.token = null;
    },

    isAuthenticated() {
      return !!this.user;
    },
  },
});
