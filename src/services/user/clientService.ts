import _ from 'lodash'
import _get from 'lodash/get'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

export const updateUserStatus = async (data: any) => {
  try {
    const resCharity = await api.patch(
      `${SERVICE.user}/update-status/${data.id}`,
      data
    )
    const dataCharity = _get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}
