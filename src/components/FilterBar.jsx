import { CATEGORIES } from "../categories";

const STATUS_FILTERS = ["All", "Active", "Completed"];

export default function FilterBar({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__group" role="group" aria-label="Filter by status">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            className={`filter-bar__pill${statusFilter === status ? " filter-bar__pill--active" : ""}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <select
        className="filter-bar__select"
        value={categoryFilter}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
