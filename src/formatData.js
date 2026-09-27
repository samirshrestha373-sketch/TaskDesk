/**
 * Formats a timestamp for display next to a task: just the time if it was
 * created today, otherwise a short date + time (e.g. "Sep 23, 2:41 PM").
 */
export function formatCreatedAt(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) {
    return `Added ${timePart}`;
  }

  const datePart = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return `Added ${datePart}, ${timePart}`;
}