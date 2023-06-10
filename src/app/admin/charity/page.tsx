import React from 'react'
import { getCharity } from 'services/charity/serverService'

const AdminCharity = async () => {
  const charity = await getCharity()

  console.log(charity)

  return <div>AdminCharity</div>
}

export default AdminCharity
