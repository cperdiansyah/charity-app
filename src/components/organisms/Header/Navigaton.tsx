'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import _ from 'lodash'

// component
import Navlink from 'components/atoms/Navlink'
import CustomButton from 'components/atoms/Button'

// styles
import styles from './header.module.scss'
import { NAVIGATION_LINK } from 'utils/link'
import { IUserData } from 'stores/userData'

export interface INavlinkData {
  name: string
  href: string
  className: string
}

export const NavigationDekstop = (props: {
  data: INavlinkData[]
  isAuth: boolean
  userData: IUserData
  handleLogout: VoidFunction
}): JSX.Element => {
  const { data } = props
  const pathname = usePathname()
  return (
    <>
      <div className={` ${props.isAuth ? 'col-lg-6' : 'col-lg-7'} `}>
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
              href="#popularcause"
              className={`${styles['btn-donation']}`}
            >
              <span className="badge">
                <i className="fa fa-heart" />
                Donate Now
              </span>
            </CustomButton>
          </li>
        </ul>
        {/* <!-- .nav-menu END --> */}
      </div>
      <div className="xs-navs-button d-flex-center-end col w-full">
        {!props.isAuth ? (
          <div
            className={`login-signup-button ${styles['login-signup-button']}`}
          >
            <CustomButton
              buttontype="outline"
              islink
              href={NAVIGATION_LINK.Signup}
              text="Signup"
            />
            <CustomButton
              buttontype="primary"
              islink
              href={NAVIGATION_LINK.Login}
              text="Login"
            />
          </div>
        ) : (
          <div className="profile-menu flex items-center ">
            <CustomButton
              buttontype="primary"
              href={NAVIGATION_LINK.Profile}
              className={`${styles['profile-menu-button']} mr-3`}
            >
              <Avatar
                size={32}
                icon={<UserOutlined />}
                className="mr-2 !flex items-center justify-center "
              />
              {props.userData.name.split(' ')[0]}
            </CustomButton>
            <CustomButton
              buttontype="primary"
              onClick={props.handleLogout}
              // className=
              style={{
                padding: '8px 15px !important',
              }}
              className={`!px-3 !py-2`}
            >
              <LogoutOutlined className="mr-2" />
              Logout
            </CustomButton>
          </div>
        )}
      </div>
    </>
  )
}

export const NavigationMobile = (props: {
  data: INavlinkData[]
  isAuth: boolean
  userData: IUserData
  handleLogout: VoidFunction
}): JSX.Element => {
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

        {!props.isAuth ? (
          <>
            <li>
              <CustomButton
                buttontype="outline"
                islink
                href={NAVIGATION_LINK.Signup}
                text="Signup"
                className={`${styles['button-primary']}`}
              />
            </li>
            <li>
              <CustomButton
                buttontype="primary"
                islink
                href={NAVIGATION_LINK.Login}
                text="Login"
                className={` text-white ${styles['button-primary']}`}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <CustomButton
                buttontype="primary"
                href={NAVIGATION_LINK.Profile}
                className={` mb-5  ${styles['profile-menu-button']}  ${styles['button-primary']}`}
              >
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  className="mr-2 !flex items-center justify-center "
                />
                {props.userData.name.split(' ')[0]}
              </CustomButton>
            </li>
            <li>
              <CustomButton
                buttontype="primary"
                onClick={props.handleLogout}
                className={` mb-5 text-white ${styles['profile-menu-button']}  ${styles['logout-button']}  ${styles['button-primary']}`}
              >
                <LogoutOutlined className="mr-2" />
                Logout
              </CustomButton>
            </li>
          </>
        )}
      </ul>
    </>
  )
}
