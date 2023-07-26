'use client'
import CharityCard, { ICharityCard } from '@/components/molecules/CharityCard'
import React, { Key } from 'react'

interface ICharityList {
  dataCharity?: ICharityCard[]
  maxCharity?: number
}
const CharityList = (props: ICharityList) => {
  const filteredCharity = props.dataCharity?.slice(0, props?.maxCharity || 3)
  return (
    <section
      id="popularcause"
      className="bg-gray waypoint-tigger xs-section-padding"
    >
      <div className="container">
        <div className="xs-heading row xs-mb-60">
          <div className="col-md-9 col-xl-9">
            <h2 className="xs-title">Deadline Campaign Terdekat</h2>
            <span className="xs-separetor dashed" />
            <p>
              Campaign Donasi terdekat yang akan segera berakhir yang bisa kamu
              salurkan
              <br />
              melalui platform AmalKita
            </p>
          </div>
          {/* <!-- .xs-heading-title END --> */}
        </div>
        {/* <!-- .row end --> */}
        <div className="row">
          {props?.dataCharity &&
            filteredCharity?.map((charity: ICharityCard, index: Key) => {
              return <CharityCard {...charity} key={index} />
            })}
        </div>
        {/* <!-- .row end --> */}
      </div>
      {/* <!-- .container end --> */}
    </section>
  )
}

export default CharityList
