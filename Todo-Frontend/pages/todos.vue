<template>
  <div class="text-black p-4 sm:p-6 md:p-10 border-t-4 bg-gray-100 h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 class="text-3xl font-bold mb-4 md:mb-0">My To-Do List</h1>
      <button
        @click="logout"
        class="bg-red-500 shadow-lg text-white px-4 py-2 rounded-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
      >
        <i class="pi pi-sign-out"></i> Logout
      </button>
    </div>

    <div class="mb-4">
      <form
        @submit.prevent="createTodo"
        class="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0"
      >
        <input
          v-model="newSubject"
          placeholder="Subject"
          class="border p-2 mr-0 md:mr-2 rounded-lg w-full md:w-auto shadow focus:ring-2 focus:ring-indigo-300 transition duration-300"
          required
        />
        <input
          v-model="newDescription"
          placeholder="Description"
          class="border p-2 mr-0 md:mr-2 rounded-lg w-full md:w-auto shadow focus:ring-2 focus:ring-indigo-300 transition duration-300"
          required
        />
        <button
          type="submit"
          class="bg-gray-500 hover:bg-gray-600 opacity-60 text-white px-4 py-2 rounded-lg shadow-xl w-full sm:w-auto transition-transform duration-300 transform hover:scale-105 active:scale-95"
        >
          <i class="pi pi-plus"></i> Add To-Do
        </button>
      </form>
    </div>

    <!-- List of tasks -->
    <ul class="space-y-4">
      <li
        v-for="todo in todoStore.todos"
        :key="todo.activities_no"
        :class="[
          'bg-white p-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-95',
        ]"
      >
        <div class="flex justify-between items-center flex-wrap gap-3">
          <div v-if="isEditing === todo.activities_no" class="flex-1">
            <!-- Editing Mode -->
            <input
              v-model="editSubject"
              class="border p-2 mr-0 md:mr-2 my-3 lg:my-0 rounded-xl w-full md:w-auto shadow focus:ring-2 focus:ring-indigo-300 transition duration-300"
              required
            />
            <input
              v-model="editDescription"
              class="border p-2 mr-0 md:mr-2 rounded-xl w-full md:w-auto shadow focus:ring-2 focus:ring-indigo-300 transition duration-300"
              required
            />
          </div>
          <div v-else class="flex-1">
            <!-- Display Mode -->
            <h2 class="font-bold text-xl">{{ todo.subject }}</h2>
            <p>{{ todo.description }}</p>
            <p
              :key="todo.activities_no"
              :class="[
                'bg-white  rounded-lg shadow-lg mt-4 w-40 text-center text-blue-700',
                todo.status === 'Done' ? 'bg-blue-200' : '',
                todo.status === 'Canceled' ? 'bg-red-200' : '',
              ]"
            >
              Status: {{ todo.status }}
            </p>
          </div>

          <!-- Conditional Rendering of Buttons -->
          <div
            v-if="isEditing !== todo.activities_no"
            class="space-x-2 mt-4 md:mt-0 flex flex-wrap"
          >
            <!-- Done/Cancel/Delete Buttons -->
            <div class="flex my-2 flex-wrap gap-2">
              <button
                @click="markTodo(todo.activities_no, 'Done')"
                class="bg-gray-400 text-white px-3 py-1 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
              >
                <i class="pi pi-check"></i> Completed
              </button>
              <button
                @click="markTodo(todo.activities_no, 'Canceled')"
                class="bg-gray-400 text-white px-3 py-1 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
              >
                Not Completed
              </button>
            </div>

            <button
              @click="deleteTodo(todo.activities_no)"
              class="text-black text-2xl px-2 py-1 rounded-md opacity-65 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-trash"></i>
            </button>
            <button
              @click="enableEdit(todo.activities_no, todo.subject, todo.description)"
              class="mx-2 text-black px-2 text-2xl py-1 rounded-md transition-transform duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-pencil"></i>
            </button>
          </div>

          <!-- Save/Cancel Buttons for Edit Mode -->
          <div
            v-if="isEditing === todo.activities_no"
            class="mt-4 md:mt-0 flex flex-wrap space-x-2"
          >
            <button
              @click="submitEdit(todo.activities_no)"
              class="bg-gray-500 shadow-xl opacity-60 my-2 hover:bg-green-600 text-white px-2 py-1 text-sm rounded-md transition-transform duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-save"></i> Save
            </button>
            <button
              @click="cancelEdit"
              class="bg-gray-500 shadow-xl opacity-60 my-2 hover:bg-green-600 text-white px-2 py-1 text-sm rounded-md transition-transform duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="pi pi-times"></i> Cancel
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

// Variables for new todo and edit states
const newSubject = ref<string>("");
const newDescription = ref<string>("");
const isEditing = ref<string | null>(null);
const editSubject = ref<string>("");
const editDescription = ref<string>("");

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

// Enable edit mode for a specific todo
const enableEdit = (activities_no: string, subject: string, description: string) => {
  isEditing.value = activities_no;
  editSubject.value = subject;
  editDescription.value = description;
};

// Function to submit edited todo
const submitEdit = async (activities_no: string) => {
  try {
    await todoStore.updateTodo(activities_no, editSubject.value, editDescription.value);
    isEditing.value = null;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// Function to cancel edit mode
const cancelEdit = () => {
  isEditing.value = null;
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
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.active:scale-95 {
  transform: scale(0.95);
}

.hover:scale-105 {
  transform: scale(1.05);
}
</style>
