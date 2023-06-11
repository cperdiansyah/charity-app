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
import useLogout from 'hooks/useLogout'

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
  // custom hooks
  const screenWidth = useScreenWidth()
  const token = useAuth()
  const logoutHooks = useLogout()

  // Global state
  const [userData, setUserData] = useUserData()

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
    await logoutHooks()
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
