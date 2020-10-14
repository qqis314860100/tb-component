import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
  const [debounceVal, setDebounceVal] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounceVal(value)
    }, delay)

    /** React 会在执行当前 effect 之前对上一个 effect 进行清除 .React 会在组件卸载的时候执行清除操作*/
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceVal
}

export default useDebounce
