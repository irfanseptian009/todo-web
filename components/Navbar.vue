<template>
  <nav class="bg-gray-800 p-4 text-white flex justify-between items-center">
    <div>
      <nuxt-link to="/dashboard" class="text-white">Dashboard</nuxt-link>
    </div>
    <div>
      <button @click="logout" class="bg-red-500 px-4 py-2 rounded-lg">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
