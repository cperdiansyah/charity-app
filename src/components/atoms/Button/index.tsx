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
        className={`btn btn-primary btn-donation ${styles['btn-donation']} ${props.className}`}
        type="ghost"
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
