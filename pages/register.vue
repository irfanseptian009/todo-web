<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-700 text-center">Register</h2>
      <p class="text-gray-600 text-center mb-6">Create an account to get started.</p>

      <form @submit.prevent="handleSubmit">
        <!-- Name Input -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            v-model="formData.name"
            id="name"
            type="text"
            class="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <!-- Username Input -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input
            v-model="formData.username"
            id="username"
            type="text"
            class="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="formData.password"
            id="password"
            type="password"
            class="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Error Message -->
        <p class="text-red-500 text-sm mb-4" v-if="error">{{ error }}</p>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>
        </div>

        <!-- Login Redirect -->
        <p class="text-gray-600 text-center mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">
            Login here
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
  name: "",
  username: "",
  password: "",
});

const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async () => {
  error.value = "";

  try {
    await authStore.register(
      formData.value.name,
      formData.value.username,
      formData.value.password
    );
    router.push("/login"); // Redirect to login after successful registration
  } catch (e) {
    error.value = "Registration failed. Please try again.";
  }
};
</script>

<style scoped></style>
