'use client'

import Link from 'next/link'
import React from 'react'

interface INavlink {
  children: React.ReactNode
  disable: boolean
  href: string
  isExternalLink: boolean
  className: string
}

const Navlink = ({
  children,
  disable,
  href,
  isExternalLink,
  className,
}: INavlink) => {
  if (isExternalLink) {
    return (
      <Link href={href}>
        <a className={[className, disable ? 'disable' : ''].join(' ')}>
          {children}
        </a>
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
