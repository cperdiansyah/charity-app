import _ from 'lodash'
import _get from 'lodash/get'

import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

interface IGetBannersQuery {
  page?: number | string
  rows?: number | string
}

export const getExchangeRequestList = async (query?: IGetBannersQuery) => {
  try {
    const resReward = await api.get(`${SERVICE.Exchange}/list?status=all`, {
      params: {
        ...query,
      },
    })
    const dataReward = _get(resReward, 'data')
    return dataReward
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateExchangeRequest = async (data: any) => {
  try {
    const resCharity = await api.patch(
      `${SERVICE.Exchange}/update/${data.id}`,
      data
    )
    const dataCharity = _get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}
