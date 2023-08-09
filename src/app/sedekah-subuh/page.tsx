'use client'

import React, { useEffect, useState } from 'react'

import UserLayout from '@/components/templates/UserLayout'

import styles from './sedekah-subuh.module.scss'
import SedekahSubuh from './SedekahSubuh'
import PoinInfo from './PoinInfo'
import Heatmap from './Heatmap'
import useUserData from '@/stores/userData'
import { notify } from '@/helpers/notify'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'
import { Spin } from 'antd'
import Reward from './Reward'

const UserDonation = () => {
  const [userData, setUserData] = useUserData()
  const [dataSedekahSubuh, setDataSedekahSubuh] = useState<any>()
  const [dataPoint, setDataPoint] = useState<any>()

  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])

  useEffect(() => {
    if (userData.id && userData.id.length > 0) {
      getSedekahSubuhCampaign()
      getPoint()
    }
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
      // setLoading(false)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (error) {
      setLoading(false)

      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }
  return (
    <UserLayout
      className="relative pt-[150px] md:pt-[150px] "
      headerColor="black"
    >
      <Spin spinning={loading}>
        <div className={`top-bg ${styles['campaign-page']}`}></div>
        <div className="container gap-2">
          <Heatmap dataSedekahSubuh={dataSedekahSubuh} />
          <PoinInfo dataSedekahSubuh={dataSedekahSubuh} dataPoint={dataPoint} />
          <SedekahSubuh />
          <Reward dataPoint={dataPoint} />
        </div>
      </Spin>
    </UserLayout>
  )
}

export default UserDonation
