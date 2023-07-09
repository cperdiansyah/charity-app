'use client'

import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import CharityCard, { ICharityCard } from '@/components/molecules/CharityCard'

import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'

interface ICampaignList {
  className?: string
}
const CampaignList = (props: ICampaignList) => {
  const [charity, setCharity] = useState<ICharityCard[]>([])

  useEffect(() => {
    getCharity()
  }, [])

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
      }))

      setCharity(filteredCharity)
      return dataCharity
    } catch (error) {
      setCharity([])
      console.log(error)
      return error
    }
  }
  console.log(charity)

  return (
    <div className={`row   ${[props?.className]?.join(' ')}`}>
      {charity?.map((charity: ICharityCard) => {
        return <CharityCard {...charity} />
      })}
    </div>
  )
}

export default CampaignList
