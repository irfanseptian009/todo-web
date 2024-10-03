<template>
  <div class="text-black p-4 sm:p-6 md:p-10 border-t-4 bg-gray-100 h-screen">
    <!-- Header  -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 class="text-3xl font-bold mb-4 md:mb-0">My To-Do List</h1>
      <button
        @click="logout"
        class="bg-red-500 shadow-lg text-white px-4 py-2 rounded transition-transform duration-300 transform hover:scale-105 active:scale-95"
      >
        <i class="pi pi-sign-out"></i> Logout
      </button>
    </div>

    <div class="mb-4">
      <form
        @submit.prevent="createTodo"
        class="flex flex-col md:flex-row space-y-2 md:space-y-0"
      >
        <input
          v-model="newSubject"
          placeholder="Subject"
          class="border p-2 mr-0 md:mr-2 rounded w-full md:w-auto shadow focus:ring-2 focus:ring-indigo-300 transition duration-300"
          required
        />
        <input
          v-model="newDescription"
          placeholder="Description"
          class="border p-2 mr-0 md:mr-2 rounded w-full md:w-auto shadow focus:ring-2 focus:ring-indigo-300 transition duration-300"
          required
        />
        <button
          type="submit"
          class="bg-black text-white px-4 py-2 rounded shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          <i class="pi pi-plus"></i> Add To-Do
          <!-- Add button with icon -->
        </button>
      </form>
    </div>

    <!-- List of tasks  -->
    <ul class="space-y-4">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.activities_no"
        class="bg-white p-4 rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        <div class="flex justify-between items-center flex-wrap">
          <div class="flex-1">
            <h2 class="font-bold text-xl">{{ todo.subject }}</h2>
            <p>{{ todo.description }}</p>
            <p class="text-sm text-gray-500">Status: {{ todo.status }}</p>
          </div>
          <div class="space-x-2 mt-4 md:mt-0 flex flex-wrap">
            <button
              @click="markTodo(todo.activities_no, 'Done')"
              class="bg-green-500 text-white px-3 py-1 rounded shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-check"></i> Done
            </button>
            <button
              @click="markTodo(todo.activities_no, 'Canceled')"
              class="bg-yellow-500 text-white px-3 py-1 rounded shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-times"></i> Cancel
            </button>
            <button
              @click="deleteTodo(todo.activities_no)"
              class="bg-red-500 text-white px-3 py-1 rounded shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-trash"></i> Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Setting up the stores
const todoStore = useTodoStore();
const authStore = useAuthStore();
const router = useRouter();
const newSubject = ref<string>("");
const newDescription = ref<string>("");

// Middleware to ensure user is authenticated
definePageMeta({
  middleware: "auth",
});

// Function to create a new todo item
const createTodo = async () => {
  try {
    await todoStore.createTodo(
      newSubject.value,
      newDescription.value,
      authStore.user?._id as string
    );
    newSubject.value = "";
    newDescription.value = "";
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

// Function to mark a todo item as Done or Canceled
const markTodo = async (activities_no: string, status: "Done" | "Canceled") => {
  try {
    await todoStore.markTodo(activities_no, status);
  } catch (error) {
    console.error("Error marking todo:", error);
  }
};

// Function to delete a todo item
const deleteTodo = async (activities_no: string) => {
  try {
    await todoStore.deleteTodo(activities_no);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

// Function to log out the user
const logout = () => {
  authStore.logout();
  router.push("/login");
};

// Fetch todos when the component is mounted
onMounted(async () => {
  authStore.initializeAuth();

  if (authStore.user && authStore.user._id) {
    try {
      await todoStore.fetchTodos(authStore.user._id);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  } else {
    console.error("User ID is undefined");
  }
});
</script>

<style scoped>
/* Adding shadow and hover animations for buttons */
button,
input {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Smooth transition for buttons and inputs */
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Shadow styles */
}

.active:scale-95 {
  transform: scale(0.95); /* Scale down effect on active */
}

.hover:scale-105 {
  transform: scale(1.05); /* Scale up effect on hover */
}
</style>
