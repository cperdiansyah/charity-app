'use client'
import React, { useState, useEffect } from 'react'

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoading = () => {
    console.log('calling handleLoading')
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    window.addEventListener('load', handleLoading)
    return () => window.removeEventListener('load', handleLoading)
  }, [])
  // console.log(isLoading)
  return (
    isLoading && (
      <div id="preloader">
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    )
  )
}

export default Loading
