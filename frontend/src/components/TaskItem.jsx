import { useTasksStore } from "../store/useTasksStore";

function TaskItem({ id, title, completed }) {
  const { deleteTask, updateTask } = useTasksStore();

  const handleDelete = () => deleteTask({ id });
  const handleUpdateCheck = (event) =>
    updateTask({ id, title, completed: event.target.checked });

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleUpdateCheck} />
      <p>{title}</p>
      <div>
        <button type="button" onClick={handleDelete}>
          🗑️
        </button>
        <button type="button">Edit title</button>
      </div>
    </li>
  );
}

export default TaskItem;
