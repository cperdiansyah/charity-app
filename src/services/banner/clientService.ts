import _ from 'lodash'
import { SERVICE } from 'utils/api'
import { api } from 'utils/clientSideFetch'

export const getBannerClient = async () => {
  try {
    const resBanner = await api.get(SERVICE.banner)
    const dataBanner = _.get(resBanner, 'data')
    return dataBanner
  } catch (error) {
    return Promise.reject(error)
  }
}
