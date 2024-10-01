// middleware/auth.ts
import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  }
});
