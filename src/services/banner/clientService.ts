import _ from 'lodash'
import _get from 'lodash/get'

import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

interface IGetBannersQuery {
  page?: number | string
  rows?: number | string
}

export const getBannerClient = async (query?: IGetBannersQuery) => {
  try {
    const resBanner = await api.get(SERVICE.banner, {
      params: {
        ...query,
        status: 'all',
      },
    })
    const dataBanner = _get(resBanner, 'data')
    return dataBanner
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
