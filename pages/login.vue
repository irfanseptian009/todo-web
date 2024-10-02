<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-300"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>
      <p class="text-gray-600 text-center mb-8">
        Please login to your account to continue.
      </p>

      <form @submit.prevent="handleSubmit">
        <!-- Username Input -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
            Username
          </label>
          <input
            v-model="formData.username"
            id="username"
            type="text"
            class="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">
            Password
          </label>
          <input
            v-model="formData.password"
            id="password"
            type="password"
            class="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Error Message -->
        <p class="text-red-500 text-sm mb-4" v-if="error">{{ error }}</p>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Login
          </button>
        </div>

        <!-- Register Redirect -->
        <p class="text-gray-600 text-center mt-4">
          Don't have an account?
          <router-link to="/register" class="text-blue-600 hover:underline">
            Register here
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const formData = ref({
  username: "",
  password: "",
});

const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  error.value = "";

  try {
    await authStore.login(formData.value.username, formData.value.password);
    router.push("/todos");
  } catch (e) {
    error.value = "Invalid username or password. Please try again.";
  }
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
