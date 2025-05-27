import { useState } from "react";
import { useTasksStore } from "../store/useTasksStore";

function TaskForm() {
  const [title, setTitle] = useState();
  const { addTask } = useTasksStore();

  const handleAddTask = (event) => {
    event.preventDefault();

    //ToDo: implement validation is title empty

    addTask({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleAddTask}>
      <label htmlFor="add-task">Add a new task: </label>
      <input
        type="text"
        name="add-task"
        id="add-task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add task</button>
    </form>
  );
}

export default TaskForm;
