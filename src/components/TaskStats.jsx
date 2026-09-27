export default function TaskStats({ tasks }) {
  const remaining = tasks.filter((task) => !task.completed).length;
  const completed = tasks.length - remaining;

  return (
    <p className="task-stats">
      <strong>{remaining}</strong> remaining · <strong>{completed}</strong>{" "}
      completed · {tasks.length} total
    </p>
  );
}
