import React from 'react'

import styles from './contact.module.scss'
import Map from 'components/molecules/Map'
import Navlink from 'components/atoms/Navlink'
import UserTemplate from 'components/templates/UserLayout'

const Contact = () => {
  return (
    <UserTemplate>
      <section
        className={`xs-banner-inner-section parallax-window ${styles['banner-contact']} `}
      >
        <div className="xs-black-overlay" />
        <div className="container">
          <div className="color-white xs-inner-banner-content">
            <h2>Contact Us</h2>
            <p>Give a helping hand for poor people</p>
            <ul className="xs-breadcumb">
              <li className="badge badge-pill badge-primary">
                <Navlink href="/" className="color-white" text=" Home /" />
                Contact
              </li>
            </ul>
          </div>
        </div>
      </section>

      <main className="xs-main">
        {/* <!-- contact section --> */}
        <section className="xs-contact-section-v2">
          <div className="container">
            <div className="xs-contact-container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="xs-contact-form-wraper">
                    <h4>Drop us a line</h4>
                    <form
                      action="#"
                      method="POST"
                      id="xs-contact-form"
                      className="xs-contact-form contact-form-v2"
                    >
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          id="xs-name"
                          className="form-control"
                          placeholder="Enter Your Name....."
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <i className="fa fa-user" />
                          </div>
                        </div>
                      </div>
                      {/* <!-- .input-group END --> */}
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          id="xs-email"
                          className="form-control"
                          placeholder="Enter Your Email....."
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <i className="fa fa-envelope-o" />
                          </div>
                        </div>
                      </div>
                      {/* <!-- .input-group END --> */}
                      <div className="input-group massage-group">
                        <textarea
                          name="massage"
                          placeholder="Enter Your Message....."
                          id="xs-massage"
                          className="form-control"
                          cols={30}
                          rows={10}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <i className="fa fa-pencil" />
                          </div>
                        </div>
                      </div>
                      {/* <!-- .input-group END --> */}
                      <button
                        className="btn btn-success"
                        type="submit"
                        id="xs-submit"
                      >
                        submit
                      </button>
                    </form>
                    {/* <!-- .xs-contact-form #xs-contact-form END --> */}
                  </div>
                  {/* <!-- .xs-contact-form-wraper END --> */}
                </div>
                <div className="col-lg-6">
                  <Map />
                </div>
              </div>
              {/* <!-- .row end --> */}
            </div>
            {/* <!-- .xs-contact-container END --> */}
          </div>
          {/* <!-- .container end --> */}
        </section>
        {/* <!-- End contact section --> */}
      </main>
    </UserTemplate>
  )
}

export default Contact
