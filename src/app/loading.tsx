'use client'
import React, { useState, useEffect } from 'react'

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoading = () => {
    setTimeout(() => {
      setIsLoading(false)
      return () => window.removeEventListener('load', handleLoading)
    }, 1500)
  }

  useEffect(() => {
    window.addEventListener('load', handleLoading)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return isLoading ? (
    <div id="preloader">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  ) : (
    <></>
  ) // return <></>
}

export default Loading

