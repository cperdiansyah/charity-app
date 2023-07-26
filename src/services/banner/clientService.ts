import _ from 'lodash'
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
    const dataBanner = _.get(resBanner, 'data')
    return dataBanner
  } catch (error) {
    return Promise.reject(error)
  }
}
