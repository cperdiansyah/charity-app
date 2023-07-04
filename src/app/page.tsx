import CharityList from '@/components/organisms/CharityList'
import Info from '@/components/organisms/Info'
import Welcome from '@/components/organisms/Welcome'
import UserLayout from '@/components/templates/UserLayout'
import { SERVICE } from '@/utils/api'
import { fetchData, nextFetch } from '@/utils/serverSideFetch'

const getCharity = async () => {
  try {

    const dataCharity = await nextFetch({
      endpoint: SERVICE.charity, 
      method: 'GET',
      token: ''
    } )
    return dataCharity
  } catch (error) {
    return error
  }
}

export default async function Home() {
  const data = await getCharity()
  // console.log(data)
  return (
    <UserLayout>
      <Welcome />
      <CharityList />
      <Info />
    </UserLayout>
  )
}
