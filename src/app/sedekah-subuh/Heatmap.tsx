'use client'

import React, { useEffect, useRef, useState } from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import useUpdated from '@/hooks/useUpdated'
import styles from './sedekah-subuh.module.scss'

// Apply the plugins
dayjs.extend(utc)
dayjs.extend(timezone)

const Heatmap = (props: { dataSedekahSubuh: any }) => {
  const { dataSedekahSubuh } = props
  const [loading, setLoading] = useState(true)
  const [sedekahSubuhHistory, setSedekahSubuhHistory] = useState<any>()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  useUpdated(() => {
    if (dataSedekahSubuh) {
      setSedekahSubuhHistory((state: any) => dataSedekahSubuh?.campaignPayment)
    }
  }, [dataSedekahSubuh])

  /* Get 7 days before now */
  const today = dayjs()
  const day = []

  for (let i = 6; i >= 0; i--) {
    const date = today.subtract(i, 'days')
    day.push(date.toDate())
  }

  const sedekahSubuh = day.map((day) => {
    const dayDate = dayjs.utc(day).tz('Asia/Jakarta')

    const payment = sedekahSubuhHistory?.find((payment: any) => {
      const paymentDate = dayjs.utc(payment.updatedAt).tz('Asia/Jakarta')

      return dayDate.isSame(paymentDate, 'day')
    })

    return payment ? payment.amount : 0
  })

  /* Labels */
  const xLabels = day.map((item: any) => {
    const date = dayjs(item).format('DD')
    return date
  })
  const yLabels = ['']

  const data = new Array(yLabels.length).fill(0).map(() => sedekahSubuh)

  return (
    <div className={`mx-auto mb-3 w-3/5 ${styles['heatmap']}`}>
      {!loading && (
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          // Reder cell with tooltip
          // cellRender={(x, y, value) => (
          //   <div
          //     title={`Pos(${x}, ${y}) = ${value}`}
          //     className="text-transparent"
          //   >
          //     {value}
          //   </div>
          // )}
          yLabelsStyle={() => ({
            fontSize: '.65rem',
            textTransform: 'uppercase',
            color: '#777',
            margin: '0',
          })}
          xLabelsStyle={(index) => ({
            fontSize: '.65rem',
            marginLeft: '5px',
          })}
          cellStyle={(_x, _y, ratio) => {
            return {
              background: `${
                ratio > 0 ? `rgb(12, 160, 44, 0.5)` : `rgb(162, 163, 162, 0.5)`
              }`,
              fontSize: '.7rem',
              marginLeft: '5px',
            }
          }}
          cellHeight="3.5rem"
          xLabelsPos="bottom"
          square
        />
      )}
    </div>
  )
}

export default Heatmap
