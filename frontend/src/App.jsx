import { useEffect } from "react";
import "./App.css";
import { useTasksStore } from "./store/useTasksStore";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const { tasks, isLoading, error, getTasks } = useTasksStore();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main>
      {isLoading && "cargando ..."}
      {error && <p>Error: {error}</p>}
      <TaskForm />
      {tasks && <TaskList tasks={tasks} />}
    </main>
  );
}

export default App;
