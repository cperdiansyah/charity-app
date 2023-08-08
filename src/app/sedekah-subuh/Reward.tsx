'use client'
import React, { useEffect, useState } from 'react'
import { Card, Empty } from 'antd'
import styles from './sedekah-subuh.module.scss'
import CustomButton from '@/components/atoms/Button'
import { notify } from '@/helpers/notify'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import { formatNumber } from './PoinInfo'

const Reward = (props: { dataPoint: any }) => {
  const [dataReward, setDataReward] = useState<any>()

  useEffect(() => {
    getRewardData()
  }, [])
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
  return (
    <div className="mx-auto mb-5  ">
      <h3 className="h3 mb-3 text-center text-xl">Reward</h3>
      <div className="reward-list flex flex-col gap-3 md:flex-row">
        {dataReward?.length === 0 ? (
          <Empty description="Reward Tidak Tersedia" className="mx-auto" />
        ) : (
          dataReward?.map((reward: any) => {
            return (
              <RewardCard
                image={reward?.image}
                point={props.dataPoint?.value}
                price={reward?.price}
                title={reward?.name}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

interface IRewardCard {
  image?: string
  title: string
  point: number
  price: number
}

const RewardCard = (props: IRewardCard) => {
  return (
    <Card className="mx-auto mb-3 w-full rounded-lg shadow-md md:w-1/2">
      <div className="card-wrapper flex flex-col  gap-4">
        <img
          src={
            props?.image ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
          }
          alt={props.title}
          className={` ${styles['reward-card-image']}`}
        />
        <h5 className="text-center text-lg font-semibold">{props.title}</h5>
        <CustomButton
          buttontype="primary"
          // className={`btn btn-primary btn-block ${styles['card-button']} `}
          className={` btn btn-primary btn-block ${
            styles['sedekah-subuh-active']
          } ${
            props.price > (props?.point || 0)
              ? `${styles['sedekah-subuh-notactive']} cursor-not-allowed`
              : ''
          } `}
          // href="#popularcause"
          // href={`${NAVIGATION_LINK.Campaign}/${slug}`}
          disabled={props.price > (props?.point || 0)}
        >
          Tukarkan {formatNumber(props.price)} Point
        </CustomButton>
      </div>
    </Card>
  )
}

export default Reward
