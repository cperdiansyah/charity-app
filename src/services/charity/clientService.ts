import _ from 'lodash'
import _get from 'lodash/get'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

interface IGetCharityQuery {
  page?: number | string
  rows?: number | string
}

type status = 'accept' | 'pending' | 'rejected' | 'completed' | 'all'

export const getCharityClient = async (
  query?: IGetCharityQuery,
  status: status = 'all'
) => {
  try {
    const resCharity = await api.get(SERVICE.charity, {
      params: {
        ...query,
        status,
      },
    })
    const dataCharity = _.get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateCharityStatus = async (data: any) => {
  try {
    const resCharity = await api.patch(
      `${SERVICE.charity}/update-status/${data.id}`,
      data
    )
    const dataCharity = _get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}
