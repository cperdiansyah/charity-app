'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
// component
import Navlink from 'components/atoms/Navlink'
import CustomButton from 'components/atoms/Button'
import { Spin } from 'antd';

// styles
import styles from './header.module.scss'
import { NAVIGATION_LINK } from 'utils/link'

interface INavlinkData {
  name: string
  href: string
  className: string
}

const Header = () => {
  const pathname = usePathname()
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
  return (
    <header className="xs-header header-transparent">
      <div className="container">
        <nav className="xs-menus">
          {/* <!-- .nav-header END --> */}
          <div className="nav-menus-wrapper row">
            <div className="xs-logo-wraper col-lg-2 xs-padding-0">
              <Navlink
                className={`nav-brand ${styles['nav-brand']}`}
                href={NAVIGATION_LINK.Homepage}
              >
                <img src="/images/logo.png" alt="" />
              </Navlink>
            </div>
            {/* <!-- .xs-logo-wraper END --> */}
            <div className="col-lg-7">
              <ul className={`nav-menu ${styles['nav-menu']}`}>
                {navLinkData.map((item: INavlinkData, index: number) => (
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
            </div>
            {/* <div className="xs-navs-button d-flex-center-end col-lg-3">
              <a href="#popularcause" className="btn btn-primary">
                <span className="badge">
                  <i className="fa fa-heart" />
                </span>
                Donate Now
              </a>
            </div> */}
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
