import React from 'react'

const Info = () => {
  return (
    // <!-- short service promo section -->
    <section className="xs-section-padding">
      <div className="container">
        <div className="xs-heading xs-mb-70 text-center">
          <h2 className="xs-mb-0 xs-title">
            Sejuta Kebaikan Dimulai
            <br />
            <span
              style={{
                padding: '0 0.5rem',
              }}
            >
              Dari Satu Langkah Bersama.
              <br />
            </span>
            Beramal Mewujudkan Impian!
          </h2>
        </div>
        <div className="row text-center lg:text-left">
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-water" />
              <h5>
                Anak yatim piatu
                {/* <br />
                For Poor People */}
              </h5>
              <p>
                Jumlah anak yatim piatu di Indonesia terus meningkat, mencapai
                angka yang mencemaskan. Mereka, yang kehilangan orang tua mereka
                karena berbagai alasan tragis
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-groceries" />
              <h5>Pendidikan</h5>
              <p>
                Masih terdapat tantangan besar terkait anak-anak yang tidak
                sekolah di Indonesia. Meskipun upaya telah dilakukan untuk
                meningkatkan akses dan kualitas pendidikan, masih ada anak-anak
                yang terhalang oleh faktor-faktor seperti kemiskinan, konflik,
                geografis, diskriminasi gender, dan tradisi budaya
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-heartbeat" />
              <h5>Medis</h5>
              <p>
                Keperluan bantuan medis menjadi suatu kebutuhan mendesak di
                banyak wilayah di seluruh dunia, termasuk Indonesia. Dalam
                situasi darurat, seperti bencana alam atau pandemi, bantuan
                medis menjadi penentu kehidupan bagi banyak orang
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="xs-service-promo">
              <span className="icon-open-book" />
              <h5>Makanan</h5>
              <p>
                Keperluan makanan adalah hak dasar setiap individu, namun di
                indonesia menghadapi ketidakcukupan pangan. Masalah ini dapat
                disebabkan oleh kemiskinan, bencana alam, konflik, atau
                ketidakstabilan ekonomi
              </p>
            </div>
            {/* <!-- .xs-service-promo END --> */}
          </div>
        </div>

        {/* <div className="row text-center lg:text-left">
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
            <!-- .xs-service-promo END -->
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
            <!-- .xs-service-promo END -->
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
            <!-- .xs-service-promo END -->
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
            <!-- .xs-service-promo END -->
          </div>
        </div> */}
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
    </section>
    // <!-- End short service promo section -->
  )
}

export default Info
