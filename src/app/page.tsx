import { ICharityCard } from '@/components/molecules/CharityCard'
import CharityList from '@/components/organisms/CharityList'
import Info from '@/components/organisms/Info'
import Welcome from '@/components/organisms/Welcome'
import UserLayout from '@/components/templates/UserLayout'
import { SERVICE } from '@/utils/api'
import { fetchData, nextFetch } from '@/utils/serverSideFetch'
import _ from 'lodash'

const getCharity = async () => {
  try {
    const dataCharity = await nextFetch({
      endpoint: SERVICE.charity,
      method: 'GET',
      token: '',
    })
    return dataCharity
  } catch (error) {
    return error
  }
}

export default async function Home() {
  const dataCharity = await getCharity()
  // console.log(data)
  const { charity } = dataCharity

  const filteredCharity: ICharityCard[] = charity?.map((item: any) => ({
    image:
      _.get(item, 'media[0].content') ||
      'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
    target: item.donation_target,
    donated: 0,
    title: item.title,
    endDate: item.end_date,
    author: item.author.name,
    slug: item.slug,
  }))
  console.log(filteredCharity)

  return (
    <UserLayout>
      <Welcome />
      <CharityList dataCharity={filteredCharity} maxCharity={3} />
      <Info />
    </UserLayout>
  )
}
