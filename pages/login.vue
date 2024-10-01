<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form class="bg-white p-6 rounded shadow-md" @submit.prevent="login">
      <h2 class="mb-4 text-lg font-bold">Login</h2>
      <input
        v-model="userId"
        placeholder="User ID"
        required
        class="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const userId = ref("");
const password = ref("");
const authStore = useAuthStore();

async function login() {
  try {
    await authStore.login(userId.value, password.value);
    navigateTo("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
  }
}
</script>
