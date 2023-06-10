import React from 'react'
import { FETCH_OPTIONS, SERVICE, nextFetch } from 'utils/api'
import { cookies } from 'next/headers'

const getCharity = async () => {
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
  } catch (error) {
    // console.log(error)
  }
}

const AdminCharity = async () => {
  const charity = await getCharity()

  return <div>AdminCharity</div>
}

export default AdminCharity
