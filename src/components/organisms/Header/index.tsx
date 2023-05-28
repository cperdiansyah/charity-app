'use client'
import React from 'react'
// import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
// component
import Navlink from 'components/atoms/Navlink'
// styles
import styles from './header.module.scss'
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
      href: '/',
      className: '',
    },
    {
      name: 'About',
      href: '/about',
      className: '',
    },
    {
      name: 'Contact',
      href: '/contact',
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
              <a className={`nav-brand ${styles['nav-brand']}`} href="/">
                <img src="/images/logo.png" alt="" />
              </a>
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
              </ul>
              {/* <!-- .nav-menu END --> */}
            </div>
            <div className="xs-navs-button d-flex-center-end col-lg-3">
              <a href="#popularcause" className="btn btn-primary">
                <span className="badge">
                  <i className="fa fa-heart" />
                </span>
                Donate Now
              </a>
            </div>
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
