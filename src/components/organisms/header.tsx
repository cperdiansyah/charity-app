'use client'
import React from 'react'

const Header = () => {
  return (
    <header className="xs-header header-transparent">
      <div className="container">
        <nav className="xs-menus">
          {/* <!-- .nav-header END --> */}
          <div className="nav-menus-wrapper row">
            <div className="xs-logo-wraper col-lg-2 xs-padding-0">
              <a className="nav-brand" href="/">
                <img src="/assets/images/logo.png" alt="" />
              </a>
            </div>
            {/* <!-- .xs-logo-wraper END --> */}
            <div className="col-lg-7">
              <ul className="nav-menu">
                <li>
                  <a href="/">home</a>
                </li>
                <li>
                  <a href="/about">about</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
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
