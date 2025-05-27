import { create } from "zustand";
import { getApiTasks } from "../services/service";

const BASE_URL = "http://localhost:3001/tasks";

export const useTasksStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  getTasks: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await getApiTasks();

      set({ tasks: data, isLoading: false });
    } catch (e) {
      set({ error: `Failed to fetch tasks: ${e}`, isLoading: false });
    }
  },
  addTask: async ({ title }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const newTask = await res.json();
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (e) {
      set({ error: `Failed to add the task: ${e}`, isLoading: false });
    }
  },
  updateTask: async ({ id, title, completed }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
      });

      const newTask = await res.json();
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? newTask : task)),
        isLoading: false,
      }));
    } catch (e) {
      set({ error: `Failed to update the task: ${e}`, isLoading: false });
    }
  },
  deleteTask: async ({ id }) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          isLoading: false,
        }));
      }
    } catch (e) {
      set({ error: `Failed to delete the task: ${e}`, isLoading: false });
    }
  },
}));
