'use client'
import React, { useState, useRef } from 'react'
import { Drawer, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import _ from 'lodash'

// component
import Navlink from 'components/atoms/Navlink'

// custom hooks
import useScreenWidth from 'hooks/useScreenWidth'
import useAuth from 'hooks/useAuth'

// styles
import styles from './header.module.scss'

// utils
import { NAVIGATION_LINK } from 'utils/link'
import useUserData from 'stores/userData'
import { INavlinkData, NavigationDekstop, NavigationMobile } from './Navigaton'
import { IErrorResponse } from 'services/auth/index.interface'
import { notify } from 'helpers/notify'
import { logoutServices } from 'services/auth'
import { usePathname, useRouter } from 'next/navigation'
import useSpinnerLayout from 'stores/spinnerLayout'

const navLinkData: INavlinkData[] = [
  {
    name: 'Home',
    href: NAVIGATION_LINK.Homepage,
    className: '',
  },
  {
    name: 'About',
    href: NAVIGATION_LINK.About,
    className: '',
  },
  {
    name: 'Contact',
    href: NAVIGATION_LINK.Contact,
    className: '',
  },
]

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  // custom hooks
  const screenWidth = useScreenWidth()
  const token = useAuth()
  const [userData, setUserData] = useUserData()
  const [, setSpinnerLayout] = useSpinnerLayout()

  const isAuth = useRef<boolean>(false)
  const [showDrawer, setShowDrawer] = useState(false)

  if (_.isEmpty(token)) {
    isAuth.current = false
  } else {
    isAuth.current = true
  }

  const buttonShowDrawer = () => {
    setShowDrawer(!showDrawer)
  }

  const onClose = () => {
    setShowDrawer(false)
  }

  const handleLogout = async () => {
    setSpinnerLayout(true)

    try {
      const response = await logoutServices()
      onClose()

      if ('status' in response) {
        notify('success', 'Logout successful', '', 'bottomRight')
        setTimeout(() => {
          if (pathname !== NAVIGATION_LINK.Homepage)
            router.push(NAVIGATION_LINK.Homepage)
          setSpinnerLayout(false)
          return router.refresh()
        }, 500)
      }
    } catch (error) {
      const resError: IErrorResponse = _.get(error, 'error', {
        code: 400,
        message: '',
      })
      notify('error', resError.message, '', 'bottomRight')
      setSpinnerLayout(false)
    }
  }

  return (
    <header className="xs-header header-transparent">
      <div className="container">
        <nav className="xs-menus">
          {/* <!-- .nav-header END --> */}
          <div className="nav-menus-wrapper row">
            <div
              className={`xs-logo-wraper col-lg-2 xs-padding-0  ${styles['nav-wrapper']} `}
            >
              <Navlink
                className={`nav-brand ${styles['nav-brand']} md:m-0 `}
                href={NAVIGATION_LINK.Homepage}
              >
                <img src="/images/logo.png" alt="" />
              </Navlink>
              {/* <span>tester</span> */}

              {screenWidth < 1000 && (
                <>
                  <Button
                    className="barsMenu"
                    type="default"
                    onClick={buttonShowDrawer}
                  >
                    {showDrawer ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>

                  <Drawer
                    // title="Basic Drawer"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    open={showDrawer}
                    size={'default'}
                    className={`drawer ${styles['drawer']}  `}
                  >
                    <NavigationMobile
                      data={navLinkData}
                      isAuth={isAuth.current}
                      userData={userData}
                      handleLogout={handleLogout}
                    />
                  </Drawer>
                </>
              )}
            </div>
            {/* <!-- .xs-logo-wraper END --> */}
            {screenWidth > 1000 && (
              <NavigationDekstop
                data={navLinkData}
                isAuth={isAuth.current}
                userData={userData}
                handleLogout={handleLogout}
              />
            )}
            {/* <!-- .xs-navs-button END --> */}
          </div>
          {/* <!-- .nav-menus-wrapper .row END --> */}
        </nav>
        {/* <!-- .xs-menus .fundpress-menu END --> */}
      </div>
      {/* <!-- .container end --> */}
    </header>
  )
}

export default Header
