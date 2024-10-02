<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">My To-Do List</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>

    <div class="mb-4">
      <form @submit.prevent="createTodo">
        <input
          v-model="newSubject"
          placeholder="Subject"
          class="border p-2 mr-2 rounded"
          required
        />
        <input
          v-model="newDescription"
          placeholder="Description"
          class="border p-2 mr-2 rounded"
          required
        />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Add To-Do
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>

    <ul class="space-y-4">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.activities_no"
        class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="font-bold text-xl">{{ todo.subject }}</h2>
            <p>{{ todo.description }}</p>
            <p class="text-sm text-gray-500">Status: {{ todo.status }}</p>
          </div>
          <div class="space-x-2">
            <button
              @click="markTodo(todo.activities_no, 'Done')"
              class="bg-green-500 text-white px-3 py-1 rounded"
            >
              Done
            </button>
            <button
              @click="markTodo(todo.activities_no, 'Canceled')"
              class="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              @click="deleteTodo(todo.activities_no)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useTodoStore } from "@/stores/todo";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const todoStore = useTodoStore();
const authStore = useAuthStore();
const router = useRouter();

const newSubject = ref("");
const newDescription = ref("");
const errorMessage = ref("");

const createTodo = async () => {
  try {
    errorMessage.value = "";
    await todoStore.createTodo(
      newSubject.value,
      newDescription.value,
      authStore.user._id
    );
    newSubject.value = "";
    newDescription.value = "";
  } catch (error) {
    // Update error message based on the error response
    errorMessage.value =
      "Failed to create todo: " + (error.response?.data?.error || error.message);
    console.error("Failed to create todo:", error);
  }
};

const markTodo = async (activities_no, status) => {
  try {
    await todoStore.markTodo(activities_no, status);
  } catch (error) {
    console.error("Failed to mark todo:", error);
  }
};

const deleteTodo = async (activities_no) => {
  try {
    await todoStore.deleteTodo(activities_no);
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(async () => {
  if (authStore.user) {
    try {
      await todoStore.fetchTodos(authStore.user._id);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }
});
</script>
