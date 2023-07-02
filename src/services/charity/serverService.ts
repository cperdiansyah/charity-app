import { SERVICE } from '@/utils/api'
import { cookies } from 'next/headers'
import { nextFetch } from '@/utils/serverSideFetch'

export const getCharity = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  try {
    const charity = await nextFetch(
      SERVICE.charity,
      undefined,
      'GET',
      token?.value
    )
    // console.log(charity)
    // .then((response) => response.json())
    return charity
  } catch (error) {
    return error
    // return Promise.reject(error)
  }
}
