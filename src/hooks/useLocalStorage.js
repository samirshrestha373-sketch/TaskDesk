import { useState, useEffect } from "react";

/**
 * Syncs a piece of state with localStorage so it survives a page refresh.
 * Works just like useState, but reads an initial value from storage and
 * writes back to storage whenever the value changes.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Could not write localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
