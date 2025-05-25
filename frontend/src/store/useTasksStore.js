import { create } from "zustand";
import { getApiTasks } from "../services/service";

export const useTasksStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  getTasks: () => {
    const data = getApiTasks();

    set({ tasks: data });
  },
  addTask: async ({ title }) => {
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newTask = await res.json();
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  updateTask: async ({ id, title, completed }) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed }),
    });

    const newTask = await res.json();
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  deleteTask: async ({ id }) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    }
  },
}));
