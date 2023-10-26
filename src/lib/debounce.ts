import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
  // debounceValue state change occurs only after delay time
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // each time value changes, we set a timeout
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    // each time useEffect runs (value changes => editor state still changing), it clears the previous timeout
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
