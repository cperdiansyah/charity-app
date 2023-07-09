import Link from 'next/link'
import React from 'react'

import styles from './banner.module.scss'

export interface IBannerItem {
  href: string
  imgSrc: string
  title?: string
}

const BannerItem = (props: IBannerItem) => {
  console.log(props)
  return (
    <a
      href={props.href}
      className={`${styles['banner-link']}`}
      // target="_blank"
      // rel="noopener noreferrer"
    >
      <img
        src={props.imgSrc}
        alt={props?.title || 'banner image'}
        className={`${styles['banner-image']}`}
        loading='lazy'
        decoding='async'
      />
    </a>
  )
}

export default BannerItem
