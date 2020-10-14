import { useEffect, RefObject } from 'react'

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      }
      handler(e)
    }
    window.addEventListener('click', listener)
    return () => {
      window.removeEventListener('click', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
