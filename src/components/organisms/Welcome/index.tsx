'use client'
import React, { useEffect, useState } from 'react'
import styles from './welcome.module.scss'
const Welcome = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/charity`
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      const data = await response.json()
      setData(data)
      // .then((res) => res.json())
      // .then((data) => {
      //   setLoading(false)
      // })
    }
    // fetchData()
  }, [])
  // console.log(data)

  const checkApi = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/charity`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Credentials': 'true',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    const response = await data.json()
    console.log(response)
    // return data.json()r
    return data
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
              <button onClick={checkApi} className="btn btn-outline-primary">
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
