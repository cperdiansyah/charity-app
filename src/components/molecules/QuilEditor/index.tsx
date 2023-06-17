'use client'
import React, { useEffect, useState } from 'react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import useTextEditor from 'stores/textEditor'
import { Spin } from 'antd'

interface IProps {
  initialValue?: string
  placeholder?: string
}

const QuilEditor = (props: IProps) => {
  const [value, setValue] = useTextEditor(props.initialValue ?? '')

  const [loading, setLoading] = useState(true)

  const handleChange = (values: string) => {
    setValue(values)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  if (!loading)
    return (
      <ReactQuill
        className=""
        style={{ height: '150px', marginBottom: '50px' }}
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={props?.placeholder}
      />
    )

  return (
    <Spin
      size="large"
      className="mx-auto my-5 block h-full max-h-[150ox] w-full"
    />
  )
}

export default QuilEditor
