'use client'
import React from 'react'
const Footer = () => {
  const getYear = new Date().getFullYear()
  return (
    // <!-- footer section start -->
    <footer className="xs-footer-section">
      <div className="container">
        <div className="xs-footer-top-layer">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-widget xs-pr-20">
              <a href="/" className="xs-footer-logo">
                <img src="/images/footer_logo.png" alt="" />
              </a>
              <p>
                CharityPress online and raise money for charity and causes
                you’re passionate about. CharityPress is an innovative,
                cost-effective online.
              </p>
              <ul className="xs-social-list-v2">
                <li>
                  <a href="" className="color-facebook">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="" className="color-twitter">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="" className="color-dribbble">
                    <i className="fa fa-dribbble" />
                  </a>
                </li>
                <li>
                  <a href="" className="color-pinterest">
                    <i className="fa fa-pinterest" />
                  </a>
                </li>
              </ul>
              {/* <!-- .xs-social-list END --> */}
            </div>
            <div className="col-lg-4 col-md-6 footer-widget">
              <h3 className="widget-title">About Us</h3>
              <ul className="xs-footer-list">
                <li>
                  <a href="/">About employee</a>
                </li>
                <li>
                  <a href="#">How it works</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-widget">
              <h3 className="widget-title">Contact Us</h3>
              <ul className="xs-info-list">
                <li>
                  <i className="fa fa-home" />
                  Sector # 48, 123 Street, miosya road VIC 28, Australia.
                </li>
                <li>
                  <i className="fa fa-phone" />
                  (800) 123.456.7890 (800) 123.456.7890 +00 99 88 5647
                </li>
                <li>
                  <i className="fa fa-envelope-o" />
                  <a href="mailto:yourname@domain.com">yourname@domain.com</a>
                </li>
              </ul>
              {/* <!-- .xs-list-with-icon END --> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="xs-copyright">
          <div className="row">
            <div className="col-md-6">
              <div className="xs-copyright-text">
                <p>
                  &copy; Copyright {getYear} Amalkita. - All Right's Reserved
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <nav className="xs-footer-menu">
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Help Desk</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="xs-back-to-top-wraper">
        <a href="#" className="xs-back-to-top">
          <i className="fa fa-angle-up" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
