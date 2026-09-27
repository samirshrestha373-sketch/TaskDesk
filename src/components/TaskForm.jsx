import { useState } from "react";
import { CATEGORIES } from "../categories";

/**
 * Controlled form for creating a new task. Keeps its own local state for
 * the two inputs and hands a finished task back to the parent on submit.
 */
export default function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmed = text.trim();
    if (trimmed === "") return;

    onAddTask({ text: trimmed, category });
    setText("");
    setCategory(CATEGORIES[0].id);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form__input"
        placeholder="What needs doing?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="New task description"
      />

      <select
        className="task-form__select"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        aria-label="Task category"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label}
          </option>
        ))}
      </select>

      <button type="submit" className="task-form__submit">
        Add task
      </button>
    </form>
  );
}
