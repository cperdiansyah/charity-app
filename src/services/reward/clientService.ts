import _ from 'lodash'
import _get from 'lodash/get'

import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

interface IGetBannersQuery {
  page?: number | string
  rows?: number | string
}

export const getRewardClient = async (query?: IGetBannersQuery) => {
  try {
    const resReward = await api.get(`${SERVICE.Reward}/list`, {
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

export const updateBannerStatus = async (data: any) => {
  try {
    const resCharity = await api.patch(
      `${SERVICE.banner}/update-status/${data.id}`,
      data
    )
    const dataCharity = _get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}
