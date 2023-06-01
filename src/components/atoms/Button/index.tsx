import React from 'react'
import { Button, Space } from 'antd'
import { IPorps } from './interface'

// Styles
import styles from './button.module.scss'

const CustomButton = (props: IPorps) => {
  const { type = 'default' } = props
  if (type === 'primary') {
    return (
      <Button
        {...props}
        className={`btn btn-primary btn-primary ${styles['btn-primary']} ${props.className}`}
        type="ghost"
      >
        {props.children}
      </Button>
    )
  }
  if (type === 'outline') {
    return (
      <Button
        {...props}
        className={`btn ${[
          styles['btn-primary'],
          styles['btn-secondary'],
        ].join(" ")}  ${props.className}`}
        type="default"
      >
        {props.children}
      </Button>
    )
  }

  return (
    <Button {...props} type="default">
      {props.children}
    </Button>
  )
}

export default CustomButton
