'use client'

import React, { useEffect, useState, Key } from 'react'
import _ from 'lodash'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'

import CharityCard, { ICharityCard } from '@/components/molecules/CharityCard'

import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import useUpdated from '@/hooks/useUpdated'
import { calculateTotalAmount } from '@/helpers'

interface ICampaignList {
  className?: string
}
const CampaignList = (props: ICampaignList) => {
  const [charity, setCharity] = useState<ICharityCard[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCharity()
  }, [])

  useUpdated(() => {
    if (!_isEmpty(charity)) {
      setLoading(true)
      getPaymentData()
      setLoading(false)
    }
  }, [charity?.length])
  const getCharity = async () => {
    try {
      const dataCharity = await api.get(SERVICE.charity)
      const { charity } = dataCharity.data
      const filteredCharity: ICharityCard[] = charity?.map((item: any) => ({
        image:
          _.get(item, 'media[0].content') ||
          'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
        target: item?.donation_target,
        donated: 0,
        title: item?.title,
        endDate: item?.end_date,
        author: item?.author.name,
        slug: item?.slug,
        id: item?._id,
      }))

      setCharity(filteredCharity)
      return dataCharity
    } catch (error) {
      setCharity([])
      console.log(error)
      return error
    }
  }

  const getPaymentData = async () => {
    try {
      const listIdCharity: string[] = []
      charity?.length !== 0 &&
        charity?.forEach((item: any) => {
          listIdCharity.push(item.id)
        })
      const resPaymentCharity = await api.get(
        `${
          SERVICE.Transaction
        }/list?status=settlement&getAll=true&campaign_ids[]=${listIdCharity.join(
          '&campaign_ids[]='
        )}`
      )
      const dataPayment = resPaymentCharity.data.campaignPayment


      const updatedCharity: ICharityCard[] = charity?.map((item: any) => {
        const filteredCharityCard = dataPayment?.filter(
          (data: any) => data?.campaign_id._id === item.id
        )
        const totalAmount = calculateTotalAmount(filteredCharityCard)

        return {
          ...item,
          donated: totalAmount,
        }
      })
      setCharity(updatedCharity)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className={`row   ${[props?.className]?.join(' ')}`}>
      {charity?.map((charity: ICharityCard, index: Key) => {
        return <CharityCard {...charity} key={index} />
      })}
    </div>
  )
}

export default CampaignList
