'use client'
import React, { useState, useEffect } from 'react'

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoading = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const checkLoading = () => {
      window.addEventListener('load', handleLoading)
      // return () => window.removeEventListener('load', handleLoading)
      setTimeout(() => {
        handleLoading()
      }, 1000)
    }
    checkLoading()
    return () => window.removeEventListener('load', handleLoading)
  }, [])

  return !isLoading ? (
    <></>
  ) : (
    <div id="preloader">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  )
}

export default Loading
