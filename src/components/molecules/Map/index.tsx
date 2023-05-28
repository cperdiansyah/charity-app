'use client'
import React from 'react'

import styles from './map.module.scss'

interface IMap {
  src?: string
}
const Map = ({
  src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253834.52470032894!2d106.52003712499999!3d-6.242046299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f117796d80a1%3A0x4c3c904bd5138a15!2sUniversitas%20Satya%20Negara%20Indonesia!5e0!3m2!1sid!2sid!4v1685288073901!5m2!1sid!2sid',
}: IMap) => {
  return (
    <iframe
      src={src}
      className={`${styles['map']}`}
      style={{ border: 0 }}
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      loading="lazy"
    ></iframe>
  )
}

export default Map
