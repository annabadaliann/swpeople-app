import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export const useDebouncedCallback = (
  callback: (value: string) => void,
  initialValue = "",
  delay = 500
) => {
  const [value, setValue] = useState(initialValue);
  const isInitRef = useRef(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!isInitRef.current) {
      isInitRef.current = true;
    }
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    if (!isInitRef.current) {
      return;
    }

    const timeoutId = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay, value]);

  return handleChange;
};
