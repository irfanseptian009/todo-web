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
definePageMeta({
  middleware: "auth",
});
import { useTodoStore } from "@/stores/todo";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const todoStore = useTodoStore();
const authStore = useAuthStore();
const router = useRouter();

const newSubject = ref("");
const newDescription = ref("");

const createTodo = async () => {
  try {
    await todoStore.createTodo(
      newSubject.value,
      newDescription.value,
      authStore.user._id
    );
    newSubject.value = "";
    newDescription.value = "";
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

const markTodo = async (activities_no, status) => {
  try {
    await todoStore.markTodo(activities_no, status);
  } catch (error) {
    console.error("Error marking todo:", error);
  }
};

const deleteTodo = async (activities_no) => {
  try {
    await todoStore.deleteTodo(activities_no);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};

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
.container {
  max-width: 800px;
}
</style>
