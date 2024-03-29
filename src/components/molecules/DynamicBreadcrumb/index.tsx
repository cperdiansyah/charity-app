'use client'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import Navlink from '@/components/atoms/Navlink'
import { usePathname } from 'next/navigation'
import { NAVIGATION_LINK } from '@/utils/link'
import { removeAdminPath } from '@/helpers'

export const DynamicBreadcrumbs = () => {
  const pathname = usePathname()
  const [items, setItems] = useState([
    {
      title: <Navlink text="Home" href={NAVIGATION_LINK.AdminHome} />,
    },
  ])

  useEffect(() => {
    generateBreadcrumbItems(pathname)
  }, [pathname])

  const generateBreadcrumbItems = (pathname: string) => {
    const clearPathname = removeAdminPath(pathname)
    const pathSegments = clearPathname
      .split('/')
      .filter((segment) => segment !== '')

    let currentPath = '/admin'
    const breadcrumbItems = [
      {
        title: <Navlink text="Home" href={currentPath} />,
      },
    ]

    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`
      breadcrumbItems.push({
        title: (
          <Navlink
            text={pathSegments[i].replace(/-/g, ' ')}
            href={currentPath}
            className="capitalize"
          />
        ),
      })
    }

    setItems(breadcrumbItems)
    return breadcrumbItems
  }

  return <Breadcrumb items={items} />
}
