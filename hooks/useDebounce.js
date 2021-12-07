import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Prevent debounce on empty values or empty search strings
    if (!value || value === "" || value === false) setDebouncedValue(value);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value]);

  // [debounce, state]
  return [debouncedValue, value === debouncedValue];
}
