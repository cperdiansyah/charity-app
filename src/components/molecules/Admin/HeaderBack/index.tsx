import React, { CSSProperties, useEffect, useState } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { usePathname, useRouter } from 'next/navigation'
import { removeAdminPath } from 'helpers'
import { toCapitalize } from '@/helpers/capitalize'

const HeaderBack = (props: { style?: CSSProperties }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [header, setHeader] = useState<string | []>('')

  useEffect(() => {
    getHeaderText()
  }, [pathname])

  const getHeaderText = () => {
    const clearPathname = removeAdminPath(pathname)
    const pathSegments = clearPathname
      .split('/')
      .filter((segment) => segment !== '')
    const onlyGetSubjectPath = pathSegments.slice(0, 2).reverse().join(' ')
    setHeader(toCapitalize(onlyGetSubjectPath))
  }
  const handleClick = () => {
    router.back()
  }

  return (
    <div
      className="header-back-container flex items-center justify-start"
      style={props.style}
    >
      <Button
        onClick={handleClick}
        className=" mr-2 flex items-center justify-center border-0 "
      >
        <ArrowLeftOutlined />
      </Button>
      <span className="text-lg font-medium text-gray-500">{header}</span>
    </div>
  )
}

export default HeaderBack
