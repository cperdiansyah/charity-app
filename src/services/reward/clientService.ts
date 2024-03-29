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

export const deleteRewardClient = async (data?: any) => {
  try {
    const resReward = await api.delete(`${SERVICE.Reward}/delete/${data._id}`)
    const dataReward = _get(resReward, 'data')
    return dataReward
  } catch (error) {
    return Promise.reject(error)
  }
}
