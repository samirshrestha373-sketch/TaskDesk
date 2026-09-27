import TaskItem from "./TaskItem";

/**
 * Renders the visible tasks. Deciding *which* tasks are visible (filtering)
 * happens in the parent — this component only knows how to lay out
 * whatever list it's given, plus what to show when that list is empty.
 */
export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <p className="task-list__empty">
        Nothing here. Add a task above, or try a different filter.
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
