'use client'
import UserLayout from '@/components/templates/UserLayout'
import React, { useState, useEffect, Key } from 'react'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

import styles from '../campaign.module.scss'
import CharityCard, {
  ICharityCard,
  ICharityList,
} from '@/components/molecules/CharityCard'
import useUpdated from '@/hooks/useUpdated'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'
import { calculateTotalAmount } from '@/helpers'
import { Pagination, PaginationProps, Spin } from 'antd'

const CampaignList = () => {
  const [charity, setCharity] = useState<ICharityList>({
    charity: [],
    meta: {
      page: 1,
      rows: 10,
      totalPages: 1,
      total: 0,
    },
  })
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  useEffect(() => {
    getCharity(pagination.current, pagination.pageSize)
  }, [pagination.current, pagination.pageSize])

  useUpdated(() => {
    if (!_isEmpty(charity.charity)) {
      setLoading(true)
      getPaymentData()
      setLoading(false)
    }
  }, [charity?.charity?.length])

  const getCharity = async (page?: number, pageSize?: number) => {
    setLoading(true)

    try {
      const dataCharity = await api.get(
        `${SERVICE.charity}?page=${page || 1}&rows=${pageSize || 6}`
      )

      const charity = dataCharity.data

      const filteredCharity: ICharityList = charity?.charity?.map(
        (item: any) => ({
          image:
            _get(item, 'media[0].content') ||
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
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination({ current: page, pageSize })
  }

  return (
    <UserLayout
      className="relative pt-[90px] md:pt-[150px] "
      headerColor="black"
    >
      <div className={`top-bg ${styles['campaign-page']}`}></div>
      <div className="container">
        <Spin tip="Loading" size="small" spinning={loading}>
          <div className="row">
            {charity?.charity?.map((item: ICharityCard, index: Key) => {
              return <CharityCard {...item} key={index} />
            })}
          </div>
          <Pagination
            total={charity.meta.total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            showSizeChanger={true}
            pageSizeOptions={['10', '20', '50', '100']}
            defaultPageSize={pagination.pageSize}
            onChange={onChange}
            current={pagination.current}
            className="mb-3"
          />
        </Spin>
      </div>
    </UserLayout>
  )
}

export default CampaignList
