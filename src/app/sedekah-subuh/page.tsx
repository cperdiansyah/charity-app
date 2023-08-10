'use client'

import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
import useUpdated from '@/hooks/useUpdated'

const UserDonation = () => {
  const [userData, setUserData] = useUserData()
  const MySwal = withReactContent(Swal)
  const [dataSedekahSubuh, setDataSedekahSubuh] = useState<any>()
  const [dataPoint, setDataPoint] = useState<any>()
  const [loading, setLoading] = useState(true)

  /* Reward */
  const [dataReward, setDataReward] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickedReward, setClickedReward] = useState<any>()
  const [loadingExchangeReward, setLoadingExchangeReward] = useState(false)

  useEffect(() => {
    if (userData.id && userData.id.length > 0) {
      getSedekahSubuhCampaign()
      getPoint()
    }
    getRewardData()
  }, [userData.id])

  useUpdated(() => {
    if (userData.id && userData.id.length > 0) {
      //  getSedekahSubuhCampaign()
      getPoint()
    }
  }, [loadingExchangeReward])

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

  /* Modal */

  const getRewardData = async () => {
    try {
      const resReward = await api.get(`${SERVICE.Reward}/list`)
      const data = resReward.data
      setDataReward((state: any) => data.data)
    } catch (error) {
      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }

  const handleClick = async () => {
    setIsModalOpen((state) => true)
    try {
      setLoadingExchangeReward(true)
      const dataExchangeRequest = {
        user_id: userData.id,
        reward_id: clickedReward?._id,
      }
      // Hit exchange reward request
      await api.post(`${SERVICE.Exchange}/create`, dataExchangeRequest)

      setTimeout(() => {
        setLoadingExchangeReward(false)
        setIsModalOpen((state) => false)
        sleep(500)
        MySwal.fire({
          title: 'Penukaran point berhasil',
          html: <i>silahkan tunggu informasi lanjutan dari admin</i>,
          icon: 'success',
        })
      }, 700)
    } catch (error) {
      setLoadingExchangeReward(false)

      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }

  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
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
          <Reward
            dataPoint={dataPoint}
            isModalOpen={isModalOpen}
            loading={loadingExchangeReward}
            handleClick={handleClick}
            setClickedReward={setClickedReward}
            dataReward={dataReward}
          />
        </div>
      </Spin>
    </UserLayout>
  )
}

export default UserDonation
