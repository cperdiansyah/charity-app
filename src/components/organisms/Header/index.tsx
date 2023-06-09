'use client'
import React, { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Drawer, Button, MenuProps, Menu, Avatar, Spin } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import _ from 'lodash'

// component
import Navlink from 'components/atoms/Navlink'
import CustomButton from 'components/atoms/Button'

// custom hooks
import useScreenWidth from 'hooks/useScreenWidth'

// styles
import styles from './header.module.scss'
import { NAVIGATION_LINK } from 'utils/link'
import useAuth from 'hooks/useAuth'
import { IMenuItem } from '../Admin/Sidebar/sidebar.interface'
import { findItemByKey } from '../Admin/Sidebar/sidebar.function'
import useUserData, { IUserData } from 'stores/userData'

interface INavlinkData {
  name: string
  href: string
  className: string
}

const menuItems: MenuProps['items'] = [
  {
    label: 'Profile',
    key: 'navigationHeader',
    icon: <UserOutlined />,
    children: [
      {
        key: 'setting',
        label: 'Settings',
        icon: <SettingOutlined />,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
      },
    ],
  },
]

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
  const screenWidth = useScreenWidth()
  const token = useAuth()
  const [userData, setUserData] = useUserData()

  // console.log(_.isEmpty(token))
  // console.log(userData)

  const isAuth = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
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

  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e)
    const keyItem = e.key

    const item: IMenuItem = findItemByKey(menuItems, keyItem)
    console.log(item)
    // setCurrent(e.key)
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
                    <NavigationMobile data={navLinkData} />
                  </Drawer>
                </>
              )}
            </div>
            {/* <!-- .xs-logo-wraper END --> */}
            {screenWidth > 1000 && (
              <NavigationDekstop
                data={navLinkData}
                isAuth={isAuth.current}
                onClick={() => onClick}
                userData={userData}
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

const NavigationDekstop = (props: {
  data: INavlinkData[]
  isAuth: boolean
  onClick: VoidFunction
  userData: IUserData
}): JSX.Element => {
  const { data } = props
  const pathname = usePathname()
  return (
    <>
      <div className="col-lg-7">
        <ul className={`nav-menu ${styles['nav-menu']}`}>
          {data.map((item: INavlinkData, index: number) => (
            <li key={index}>
              <Navlink
                className={`${item.className} ${
                  pathname === item.href ? 'active' : ''
                }`}
                href={item.href}
                text={item.name}
              />
            </li>
          ))}
          <li>
            <CustomButton buttontype="primary" href="#popularcause">
              <span className="badge">
                <i className="fa fa-heart" />
                Donate Now
              </span>
            </CustomButton>
          </li>
        </ul>
        {/* <!-- .nav-menu END --> */}
      </div>
      <div className="xs-navs-button d-flex-center-end col-lg-3 w-full">
        {!props.isAuth ? (
          <div
            className={`login-signup-button ${styles['login-signup-button']}`}
          >
            <CustomButton
              buttontype="outline"
              isLink
              href={NAVIGATION_LINK.Signup}
              text="Signup"
            />
            <CustomButton
              buttontype="primary"
              isLink
              href={NAVIGATION_LINK.Login}
              text="Login"
            />
          </div>
        ) : (
          <div className="profile-menu">
            <CustomButton
              buttontype="primary"
              href={NAVIGATION_LINK.Profile}
              className={`${styles['profile-menu-button']}`}
            >
              <Avatar
                size={32}
                icon={<UserOutlined />}
                className="mr-2 !flex items-center justify-center "
              />
              {props.userData.name}
            </CustomButton>
          </div>
        )}
      </div>
    </>
  )
}

const NavigationMobile = (props: { data: INavlinkData[] }): JSX.Element => {
  const { data } = props
  const pathname = usePathname()
  return (
    <>
      <ul className={`nav-menu ${styles['nav-menu']}`}>
        {data.map((item: INavlinkData, index: number) => (
          <li key={index}>
            <Navlink
              className={`${item.className} ${
                pathname === item.href ? 'active' : ''
              }`}
              href={item.href}
              text={item.name}
            />
          </li>
        ))}
        <li>
          <CustomButton
            buttontype="primary"
            className={`mb-5 text-white ${styles['button-primary']}`}
            href="#popularcause"
          >
            <span className="badge">
              <i className="fa fa-heart" />
              Donate Now
            </span>
          </CustomButton>
        </li>
        <li>
          <CustomButton
            buttontype="outline"
            isLink
            href={NAVIGATION_LINK.Signup}
            text="Signup"
            className={`${styles['button-primary']}`}
          />
        </li>
        <li>
          <CustomButton
            buttontype="primary"
            isLink
            href={NAVIGATION_LINK.Login}
            text="Login"
            className={` text-white ${styles['button-primary']}`}
          />
        </li>
      </ul>
    </>
  )
}

export default Header
