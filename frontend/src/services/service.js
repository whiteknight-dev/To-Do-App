export async function getApiTasks() {
  const res = await fetch("http://localhost:3001/tasks");
  const data = await res.json();
  return data;
}
