import _ from 'lodash'
import { SERVICE } from 'utils/api'
import { api } from 'utils/clientSideFetch'

interface IGetCharityQuery {
  page?: number | string
  rows?: number | string
}

export const getCharityClient = async (query: IGetCharityQuery) => {
  try {
    const resCharity = await api.get(SERVICE.charity, {
      params: query,
    })
    const dataCharity = _.get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}
