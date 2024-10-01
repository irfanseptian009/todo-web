<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="mb-4 text-2xl font-bold">Dashboard</h1>
    <button @click="logout" class="mb-4 bg-red-500 text-white py-2 px-4 rounded">
      Logout
    </button>
    <p>Your to-do items will be listed here...</p>
    <!-- Add functionality to manage to-do items -->
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

// Apply middleware
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

function logout() {
  authStore.logout();
  navigateTo("/login");
}
</script>
