'use client'

import Link from 'next/link'
import React from 'react'

interface INavlink {
  children?: React.ReactNode
  disable?: boolean
  href: string
  isExternalLink?: boolean
  className: string
  text?: string
}

const Navlink = ({
  disable = false,
  href,
  isExternalLink = false,
  className,
  text,
  children,
}: INavlink) => {
  if (!isExternalLink) {
    return (
      <Link
        href={href}
        className={[className, disable ? 'disable' : ''].join(' ')}
        prefetch={true}
      >
        {text}
      </Link>
    )
  } else {
    return (
      <a
        href={href}
        className={[className, disable ? 'disable' : ''].join(' ')}
        target="_blank"
        rel="noopener"
      >
        {children}
      </a>
    )
  }
}

export default Navlink
