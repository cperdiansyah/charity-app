import _ from 'lodash'
import { SERVICE } from 'utils/api'
import { api } from 'utils/clientSideFetch'

export const getCharityClient = async () => {
  try {
    const resCharity = await api.get(SERVICE.charity)
    const dataCharity = _.get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return error
  }
}
