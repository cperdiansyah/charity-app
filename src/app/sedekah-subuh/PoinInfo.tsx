'use client'

import React, { useEffect, useState } from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { notify } from '@/helpers/notify'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'
import { Card } from 'antd'
import useUserData from '@/stores/userData'

import styles from './sedekah-subuh.module.scss'

const PoinInfo = () => {
  const [userData, setUserData] = useUserData()

  const [dataPoint, setDataPoint] = useState<any>()
  const [dataSedekahSubuh, setDataSedekahSubuh] = useState<any>()
  useEffect(() => {
    getPoint()
  }, [])
  useEffect(() => {
    getSedekahSubuhCampaign()
  }, [userData.id])
  const getPoint = async () => {
    try {
      const resPoint = await api.get(`${SERVICE.Point}/me`)
      const data = resPoint.data
      setDataPoint((state: any) => data.poin)
    } catch (error) {
      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }
  const getSedekahSubuhCampaign = async () => {
    try {
      if (userData.id) {
        const resSedekahSubuh = await api.get(
          `${SERVICE.Transaction}/sedekah-subuh/user/${userData.id}?status=settlement&distinct=true`
        )
        const dataSedekahSubuh = resSedekahSubuh.data
        setDataSedekahSubuh((state: any) => dataSedekahSubuh)
      }
    } catch (error) {
      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }
  // console.log(userData)
  console.log(dataPoint)
  console.log(dataSedekahSubuh)
  const formatNumber = (number: number) => {
    return Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      //  style: 'currency',
      minimumFractionDigits: 0,
    }).format(number)
  }
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
            <span>{formatNumber(dataPoint?.value || 0)}</span> Point
          </div>
        </div>
        <div className={`sreak-donation  ${styles['point-info']}`}>
          {/* <HeartOutlined /> */}
          <HeartFilled className={`text-lg text-red-400`} />
          <div className={`${styles['value']}`}>
            <span>{formatNumber(dataSedekahSubuh?.meta.total || 0)}</span> Hari
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PoinInfo
