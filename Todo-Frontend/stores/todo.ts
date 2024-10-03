import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

interface ToDo {
  activities_no: string;
  subject: string;
  description: string;
  status: "Unmarked" | "Done" | "Canceled";
  userId: string;
}

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<ToDo[]>([]);
  const loading = ref<boolean>(false); // Loading state
  const error = ref<string | null>(null); // Error state
  const apiBaseUrl = "http://localhost:5000/api";

  // Fetch todos by user ID
  const fetchTodos = async (userId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${apiBaseUrl}/todos?userId=${userId}`);
      todos.value = res.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error fetching todos.";
      console.error("Error fetching todos:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Create a new todo item
  const createTodo = async (subject: string, description: string, userId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.post(`${apiBaseUrl}/todos`, {
        subject,
        description,
        userId,
      });
      todos.value.push(res.data); // Push new todo to the list
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error creating todo.";
      console.error("Error creating todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update todo status (Mark as Done or Canceled)
  const markTodo = async (activities_no: string, status: "Done" | "Canceled") => {
    loading.value = true;
    error.value = null;
    try {
      await axios.put(`${apiBaseUrl}/todos/${activities_no}`, { status });
      const todo = todos.value.find((todo) => todo.activities_no === activities_no);
      if (todo) todo.status = status; // Update the status locally
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error marking todo.";
      console.error("Error marking todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update a todo item (subject & description)
  const updateTodo = async (
    activities_no: string,
    subject: string,
    description: string
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.put(`${apiBaseUrl}/todos/${activities_no}`, {
        subject,
        description,
      });
      const todoIndex = todos.value.findIndex(
        (todo) => todo.activities_no === activities_no
      );
      if (todoIndex !== -1) {
        todos.value[todoIndex] = res.data; // Update the specific todo locally
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error updating todo.";
      console.error("Error updating todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete a todo item
  const deleteTodo = async (activities_no: string) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${apiBaseUrl}/todos/${activities_no}`);
      todos.value = todos.value.filter((todo) => todo.activities_no !== activities_no);
    } catch (err: any) {
      error.value = err.response?.data?.message || "Error deleting todo.";
      console.error("Error deleting todo:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Clear all todos (optional function)
  const clearTodos = () => {
    todos.value = [];
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    markTodo,
    updateTodo,
    deleteTodo,
    clearTodos,
  };
});
