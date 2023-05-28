import React from 'react'

const Info = () => {
  return (
    // <!-- short service promo section -->
    <section className="xs-section-padding">
      <div className="container">
        <div className="xs-heading xs-mb-70 text-center">
          <h2 className="xs-mb-0 xs-title">
            We’ve funded
            <span
              style={{
                padding: '0 0.5rem',
              }}
            >
              120,00 charity projects
            </span>
            for
            <br />
            20M people around the world.
          </h2>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-water" />
              <h5>
                Pure Water
                <br />
                For Poor People
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-groceries" />
              <h5>
                Healty Food
                <br />
                For Poor People
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-heartbeat" />
              <h5>
                Medical
                <br />
                Facilities for People
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-open-book" />
              <h5>
                Pure Education
                <br />
                For Every Children
              </h5>
              <p>
                663 million people drink dirty water. Learn how access to clean
                water can improve health, boost local economies.
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
        </div>
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
    </section>
    // <!-- End short service promo section -->
  )
}

export default Info
