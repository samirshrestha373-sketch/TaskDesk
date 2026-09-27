import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import TaskStats from "./components/TaskStats";
import ThemeToggle from "./components/ThemeToggle";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export default function App() {
  // Tasks and theme both persist across refreshes via the localStorage hook.
  const [tasks, setTasks] = useLocalStorage("TaskDesk.tasks", []);
  const [theme, setTheme] = useLocalStorage("TaskDesk.theme", "light");

  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Syncs the chosen theme onto the root element so CSS variables can react to it.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function addTask({ text, category }) {
    const newTask = {
      id: createId(),
      text,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id, newText) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  // Derive the visible list from the two active filters. Recomputed only
  // when the tasks or filters actually change.
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && !task.completed) ||
        (statusFilter === "Completed" && task.completed);

      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;

      return matchesStatus && matchesCategory;
    });
  }, [tasks, statusFilter, categoryFilter]);

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">TaskDesk</h1>
          <p className="app__subtitle">A quiet place to keep track of things.</p>
        </div>
        <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} />
      </header>

      <main className="app__card">
        <TaskForm onAddTask={addTask} />

        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        <TaskStats tasks={tasks} />
      </main>

      <footer className="app__footer">
        Double click a task to rename it. Everything is saved on this device.
      </footer>
    </div>
  );
}
