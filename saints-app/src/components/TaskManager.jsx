import { useEffect, useState } from "react";
import { STRINGS } from "../i18n";

const STORAGE_KEY = "lumen.tasks.v1";
const CATEGORY_KEYS = ["Prayer", "Study", "Service", "Personal"];

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function TaskManager({ lang }) {
  const t = STRINGS[lang];
  // categories are stored by a stable English key internally, but
  // displayed using the translated label for the current language
  const categoryLabel = (key) => t.categories[CATEGORY_KEYS.indexOf(key)];

  const [tasks, setTasks] = useState(loadTasks);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Prayer");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, category, done: false },
    ]);
    setText("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((tk) => (tk.id === id ? { ...tk, done: !tk.done } : tk))
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((tk) => tk.id !== id));
  }

  const visible =
    filter === "All" ? tasks : tasks.filter((tk) => tk.category === filter);

  return (
    <div className="task-card">
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder={t.taskPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label={t.taskPlaceholder}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label={categoryLabel("Prayer")}
        >
          {CATEGORY_KEYS.map((c) => (
            <option key={c} value={c}>
              {categoryLabel(c)}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">
          {t.add}
        </button>
      </form>

      <div className="task-tabs">
        {["All", ...CATEGORY_KEYS].map((c) => (
          <button
            key={c}
            className={`chip ${filter === c ? "active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c === "All" ? t.all : categoryLabel(c)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="task-empty">{t.taskEmpty}</div>
      ) : (
        <ul className="task-list">
          {visible.map((tk) => (
            <li key={tk.id} className={`task-row ${tk.done ? "done" : ""}`}>
              <button
                className={`task-check ${tk.done ? "done" : ""}`}
                onClick={() => toggleTask(tk.id)}
                aria-label={tk.done ? "Mark task as not done" : "Mark task as done"}
              >
                {tk.done ? "\u2713" : ""}
              </button>
              <span className="task-text">{tk.text}</span>
              <span className="task-cat">{categoryLabel(tk.category)}</span>
              <button
                className="task-remove"
                onClick={() => removeTask(tk.id)}
                aria-label="Remove task"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
