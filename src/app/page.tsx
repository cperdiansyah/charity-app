'use client'

import React, { useEffect, useState, Key } from 'react'
// import _ from 'lodash'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { Empty, Spin } from 'antd'

import CharityCard, {
  ICharityCard,
  ICharityList,
} from '@/components/molecules/CharityCard'

import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import useUpdated from '@/hooks/useUpdated'
import { calculateTotalAmount } from '@/helpers'
import CustomButton from '@/components/atoms/Button'
import { NAVIGATION_LINK } from '@/utils/link'
import UserLayout from '@/components/templates/UserLayout'
import Welcome from '@/components/organisms/Welcome'
import CharityList from '@/components/organisms/CharityList'
import Info from '@/components/organisms/Info'

interface ICampaignList {
  className?: string
}
// const getCharity = async () => {
//   try {
//     const dataCharity = await nextFetch({
//       endpoint: `${SERVICE.charity}?rows=6`,
//       method: 'GET',
//       token: '',
//     })
//     return dataCharity
//   } catch (error) {
//     return error
//   }
// }

export default async function Home() {
  // const dataCharity = await getCharity()
  // const { charity } = dataCharity
  const [charity, setCharity] = useState<ICharityList>({
    charity: [],
    meta: {
      page: 1,
      rows: 6,
      totalPages: 1,
      total: 0,
    },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCharity()
  }, [])
  useUpdated(() => {
    if (!_isEmpty(charity.charity)) {
      // setLoading(true)
      getPaymentData()
      setLoading(false)
    }
  }, [charity?.charity?.length])

  const getCharity = async () => {
    // setLoading(true)

    try {
      const dataCharity = await api.get(`${SERVICE.charity}?rows=3`)
      // const { charity } = dataCharity.data
      const charity = dataCharity.data

      const filteredCharity: ICharityList = charity?.charity?.map(
        (item: any) => ({
          image:
            get(item, 'media[0].content') ||
            'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
          target: item?.donation_target,
          donated: 0,
          title: item?.title,
          endDate: item?.end_date,
          author: item?.author?.name,
          slug: item?.slug,
          id: item?._id,
        })
      )

      setCharity({
        ...charity,
        charity: filteredCharity,
      })
      setLoading(false)

      return dataCharity
    } catch (error) {
      setLoading(false)

      setCharity({ ...charity, charity: [] })
      console.log(error)
      return error
    }
  }
  const getPaymentData = async () => {
    try {
      const listIdCharity: string[] = []
      charity?.charity?.length !== 0 &&
        charity?.charity?.forEach((item: any) => {
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

      const updatedCharity: any = charity?.charity?.map((item: any) => {
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
      setCharity({
        ...charity,
        charity: updatedCharity,
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // const filteredCharity: ICharityCard[] = charity?.map((item: any) => ({
  //   image:
  //     _.get(item, 'media[0].content') ||
  //     'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
  //   target: item.donation_target,
  //   donated: 0,
  //   title: item?.title,
  //   endDate: item?.end_date,
  //   author: item?.author?.name,
  //   slug: item?.slug,
  // }))
  // console.log(filteredCharity)

  return (
    <UserLayout>
      <Welcome />
      <CharityList dataCharity={charity.charity} maxCharity={3} />
      <Info />
    </UserLayout>
  )
}
