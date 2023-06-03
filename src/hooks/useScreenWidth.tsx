'use client'
import { useState, useEffect } from 'react'

const useScreenWidth = (): number => {
  const [screenWidth, setScreenWidth] = useState(0)

  const handleResize: any = (): void => {
    setScreenWidth(window?.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side-only code

      window.addEventListener('resize', handleResize)

      // Clean up the event listener on component unmount
      return (): void => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return screenWidth
}

export default useScreenWidth
