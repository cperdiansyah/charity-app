'use client'

import React from 'react'
import { HeartFilled } from '@ant-design/icons'
import { Card } from 'antd'

import styles from './sedekah-subuh.module.scss'

const PoinInfo = (props: { dataSedekahSubuh: any; dataPoint: any }) => {
  const { dataSedekahSubuh } = props

  return (
    <Card
      className="mx-auto mb-3 flex rounded-lg shadow-md"
      style={{
        width: '70%',
      }}
      bodyStyle={{
        width: '100%',
      }}
    >
      <div className=" flex w-full  items-center justify-between">
        <div className={`point-info  ${styles['point-info']}`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Eo_circle_blue_letter-p.svg/480px-Eo_circle_blue_letter-p.svg.png"
            alt="point icon"
          />
          <div className={`${styles['value']}`}>
            <span>{formatNumber(props.dataPoint?.value || 0)}</span> Point
          </div>
        </div>
        <div className={`sreak-donation  ${styles['point-info']}`}>
          {/* <HeartOutlined /> */}
          <HeartFilled className={`text-lg text-red-400`} />
          <div className={`${styles['value']}`}>
            Total Sedekah{' '}
            <span>{formatNumber(dataSedekahSubuh?.meta?.total || 0)}</span> Hari
          </div>
        </div>
      </div>
    </Card>
  )
}
export const formatNumber: any = (number: number) => {
  return Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    //  style: 'currency',
    minimumFractionDigits: 0,
  }).format(number)
}

export default PoinInfo
