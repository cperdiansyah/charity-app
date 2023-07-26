'use client'
import React from 'react'

import styles from './map.module.scss'

interface IMap {
  src?: string
}
const Map = ({
  src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1471.4273648158976!2d106.78135210376907!3d-6.232063369716782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1666c994ff1%3A0x5534e9b194010a57!2sJl.%20Masjid%20An%20Nur%20III%20No.4!5e0!3m2!1sid!2sid!4v1690400668295!5m2!1sid!2sid',
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
