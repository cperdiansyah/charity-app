'use client'
import { useState, useEffect } from 'react'

import useUpdated from 'hooks/useUpdated'

const useScreenWidth = (): number => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [initialLoad, setInitialLoad] = useState(false)

  const handleResize: any = (): void => {
    setScreenWidth(window?.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side-only code
      setInitialLoad(true)

      window.addEventListener('resize', handleResize)

      // Clean up the event listener on component unmount
      return (): void => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useUpdated(() => {
    if (initialLoad) {
      handleResize()
    }
  }, [initialLoad])

  return screenWidth
}

export default useScreenWidth
