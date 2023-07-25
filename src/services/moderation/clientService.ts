import _get from 'lodash/get'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'

interface IGetApprovalCampaignQuery {
  page?: number | string
  rows?: number | string
  // refModel?: refModel
}
type refModel = 'User' | 'Charity' | 'Banner'

/* Get Approval */
export const getApprovalClient = async (
  query?: IGetApprovalCampaignQuery,
  refModel?: refModel
) => {
  try {
    const resCharity = await api.get(`${SERVICE.Approval}/list`, {
      params: { ...query, refModel },
    })
    const dataCharity = _get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getApprovalCharity = async (query?: IGetApprovalCampaignQuery) => {
  const dataApprovalCharity = await getApprovalClient(query, 'Charity')
  return dataApprovalCharity
}

/* Update Approval */
export const updateApprovalClient = async (data: any) => {
  try {
    const resCharity = await api.patch(`${SERVICE.Approval}/update/${data.id}`)
    const dataCharity = _get(resCharity, 'data')
    return dataCharity
  } catch (error) {
    return Promise.reject(error)
  }
}
