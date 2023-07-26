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
              <h2>Amal kita adalah kebahagiaan kita </h2>
              <p>
                Kebahagiaan adalah titik balik di mana cinta, kedamaian, dan
                keberuntungan bertemu
                <br />
                dalam pelukan satu-satunya momen yang benar-benar kita miliki
                sekarang
              </p>
              <a href="#popularcause" className="btn btn-outline-primary">
                Lihat Campaign
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
