'use client'

import React, { useEffect, useState, Key } from 'react'
import _ from 'lodash'
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

interface ICampaignList {
  className?: string
}
const CampaignList = (props: ICampaignList) => {
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
      const dataCharity = await api.get(`${SERVICE.charity}?rows=6`)
      // const { charity } = dataCharity.data
      const charity = dataCharity.data

      const filteredCharity: ICharityList = charity?.charity?.map(
        (item: any) => ({
          image:
            _.get(item, 'media[0].content') ||
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
      charity.charity?.length !== 0 &&
        charity.charity?.forEach((item: any) => {
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
  return (
    <Spin tip="Loading" size="small" spinning={loading}>
      <div className={`row   ${[props?.className]?.join(' ')}`}>
        {charity?.charity && charity?.charity?.length > 0 && !loading ? (
          charity?.charity?.map((item: ICharityCard, index: Key) => {
            return <CharityCard {...item} key={index} />
          })
        ) : (
          <Empty description="Campaigns not available" className="mx-auto" />
        )}
      </div>
      {charity.meta.total > (charity?.charity?.length || 0) && (
        // {charity.meta.total > 3 && (
        <CustomButton
          buttontype="primary"
          className={`btn btn-primary btn-block mx-auto mb-5 w-fit rounded-lg !px-4 !py-3 text-base`}
          href={`${NAVIGATION_LINK.CampaignList}`}
        >
          See More
        </CustomButton>
      )}
    </Spin>
  )
}

export default CampaignList
