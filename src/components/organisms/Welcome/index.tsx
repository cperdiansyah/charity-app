import React from 'react'
import styles from './welcome.module.scss'
const Welcome = () => {
  return (
    // <!-- welcome section -->
    <section className="">
      <div>
        <div className={`xs-welcome-content ${styles['welcome-content']}`}>
          <div className="container">
            <div className="xs-welcome-wraper color-white">
              <h2>Hunger is stalking the globe</h2>
              <p>
                Hundreds of thousands of children experiencing or witnessing
                assault
                <br />
                and other gender-based violence.
              </p>
              <a href="#popularcause" className="btn btn-outline-primary">
                View Causes
              </a>
            </div>
          </div>
          <div className="xs-black-overlay" />
        </div>
      </div>
    </section>
    // <!-- End welcome section -->
  )
}

export default Welcome
