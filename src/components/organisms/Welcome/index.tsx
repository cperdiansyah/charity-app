'use client'
import React, { useEffect, useState } from 'react'
import styles from './welcome.module.scss'
import { FETCH_OPTIONS, SERVICE } from '@/utils/api'
const Welcome = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    // fetchData()
  }, [])

  const fetchData = async () => {
    const url = [process.env.NEXT_PUBLIC_BASE_URL, SERVICE.charity].join('')

    const response = await fetch(url, FETCH_OPTIONS)

    const data = await response.json()
    // console.log(data)
    setData(data)
  }

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
              {/* <a href="#popularcause" className="btn btn-outline-primary">
                View Causes
              </a> */}
              <button onClick={fetchData} className="btn btn-outline-primary">
                View Causes
              </button>
            </div>
            {/* <!-- .xs-welcome-wraper END --> */}
          </div>
          {/* <!-- .container end --> */}
          <div className="xs-black-overlay" />
        </div>
        {/* <!-- .xs-welcome-content END --> */}
      </div>
    </section>
    // <!-- End welcome section -->
  )
}

export default Welcome
