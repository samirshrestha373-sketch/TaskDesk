import { useState } from "react";
import { getCategory } from "../categories";
import { formatCreatedAt } from "../formatData";

/**
 * Renders a single task. Handles its own "editing" mode locally, but
 * reports every actual change (toggle, save, delete) up to the parent
 * via callback props so the list of tasks stays the single source of truth.
 */
export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(task.text);

  const category = getCategory(task.category);

  function startEditing() {
    setDraftText(task.text);
    setIsEditing(true);
  }

  function saveEdit(event) {
    event.preventDefault();
    const trimmed = draftText.trim();
    if (trimmed === "") return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  return (
    <li className={`task-item${task.completed ? " task-item--done" : ""}`}>
      <label className="task-item__checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? "active" : "complete"}`}
        />
        <span className="task-item__checkmark" aria-hidden="true" />
      </label>

      {isEditing ? (
        <form className="task-item__edit-form" onSubmit={saveEdit}>
          <input
            type="text"
            className="task-item__edit-input"
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
            autoFocus
          />
          <button type="submit" className="task-item__link-btn">
            Save
          </button>
          <button
            type="button"
            className="task-item__link-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="task-item__main">
            <span className="task-item__text" onDoubleClick={startEditing}>
                {task.text}
             </span>
            <span className="task-item__meta">
              {formatCreatedAt(task.createdAt)}
            </span>
          </div>

        

          <span
            className="task-item__tag"
            style={{ "--tag-color": category.color }}
          >
            {category.label}
          </span>

          <div className="task-item__actions">
            <button
              type="button"
              className="task-item__link-btn"
              onClick={startEditing}
            >
              Edit
            </button>
            <button
              type="button"
              className="task-item__link-btn task-item__link-btn--danger"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
