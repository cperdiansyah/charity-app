'use client'
import React, { useEffect, useState } from 'react'
import useUpdated from './useUpdated'

const useMidtransSnap = () => {
  const [token, setToken] = useState('')
  useEffect(() => {
    const midtransSnapUrl =
      String(process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL).replace(/['"]+/g, '') ||
      ''
    let scriptTag = document.createElement('script')
    // scriptTag.src = midtransSnapUrl
    scriptTag.setAttribute('src', midtransSnapUrl)
    scriptTag.setAttribute(
      'data-client-key',
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
    )
    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  useUpdated(() => {
    if (token) {
      // window.snap.pay(token, {})
      if ('snap' in window) {
        // setSnap(window.snap)
        const windowSnap: any = window.snap
        // window.snap.pay(token, {})
        windowSnap.pay(token, {
          onSuccess: (result: any) => {
            localStorage.setItem('Pembayaran_sukses', JSON.stringify(result))
            setToken('')
          },
          onPending: (result: any) => {
            localStorage.setItem('Pembayaran_pending', JSON.stringify(result))
            setToken('')
          },
          onError: (result: any) => {
            localStorage.setItem('Pembayaran_error', JSON.stringify(result))
            setToken('')
          },
          onClose: (result: any) => {
            localStorage.setItem('Pembayaran_close', JSON.stringify(result))
            setToken('')
          },
        })
        // setToken('')
      }
    }
  }, [token])

  return { token, setToken }
}

export default useMidtransSnap
