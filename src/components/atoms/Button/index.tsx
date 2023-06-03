import React from 'react'
import { Button, Space } from 'antd'
import { IPorps } from './interface'

// Styles
import styles from './button.module.scss'
import Navlink from '../Navlink'

const CustomButton = (props: IPorps) => {
  const { buttontype = 'default' } = props

  // If button is Link
  if (props.isLink) {
    if (buttontype === 'primary') {
      return (
        <Navlink
          href={props.href ?? '/'}
          text={props.text}
          className={`btn btn-primary btn-primary ${styles['btn-primary']} ${props.className}`}
        />
      )
    }
    if (buttontype === 'outline') {
      return (
        <Navlink
          href={props.href ?? '/'}
          text={props.text}
          className={`btn ${[
            styles['btn-primary'],
            styles['btn-secondary'],
          ].join(' ')}  ${props.className}`}
        />
      )
    }
  }
  if (buttontype === 'primary') {
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
  if (buttontype === 'outline') {
    return (
      <Button
        {...props}
        className={`btn ${[styles['btn-primary'], styles['btn-secondary']].join(
          ' '
        )}  ${props.className}`}
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
