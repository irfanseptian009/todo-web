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
  const apiBaseUrl = "http://localhost:5000/api";

  const fetchTodos = async (userId: string) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/todos?userId=${userId}`);
      todos.value = res.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  };

  const createTodo = async (subject: string, description: string, userId: string) => {
    try {
      const res = await axios.post(`${apiBaseUrl}/todos`, {
        subject,
        description,
        userId,
      });
      todos.value.push(res.data);
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  };

  const markTodo = async (activities_no: string, status: "Done" | "Canceled") => {
    try {
      await axios.put(`${apiBaseUrl}/todos/${activities_no}`, { status });
      const todo = todos.value.find((todo) => todo.activities_no === activities_no);
      if (todo) todo.status = status;
    } catch (error) {
      console.error("Error marking todo:", error);
      throw error;
    }
  };

  const deleteTodo = async (activities_no: string) => {
    try {
      await axios.delete(`${apiBaseUrl}/todos/${activities_no}`);
      todos.value = todos.value.filter((todo) => todo.activities_no !== activities_no);
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  };

  return { todos, fetchTodos, createTodo, markTodo, deleteTodo };
});
