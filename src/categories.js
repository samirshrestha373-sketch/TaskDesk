// Central list of task categories, each with a display color used
// for the little tag/pill shown on every task and in the filter bar.
export const CATEGORIES = [
  { id: "work", label: "Work", color: "#3B6E8F" },
  { id: "personal", label: "Personal", color: "#7A8B69" },
  { id: "urgent", label: "Urgent", color: "#C1502E" },
];

export function getCategory(id) {
  return CATEGORIES.find((cat) => cat.id === id) ?? CATEGORIES[0];
}
