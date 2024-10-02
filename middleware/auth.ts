import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("token");

    const isAuthenticated = !!token;

    if (!isAuthenticated && to.path.startsWith("/todo")) {
      return navigateTo("/login");
    }
  }
});
