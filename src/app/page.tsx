import Header from '@/components/organisms/Header'
import Info from '@/components/organisms/Info'
import Welcome from '@/components/organisms/Welcome'
import UserLayout from '@/components/templates/UserLayout'
import Image from 'next/image'
// import { NEXT_PUBLIC_BASE_URL as BASE_URL } from '@/utils/api'

const getCharity = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/charity`,
      {
        next: { revalidate: 10 },
      }
    )

    const response = await data.json()
    return response
  } catch (error) {
    return error
  }
}

export default async function Home() {
  return (
    <UserLayout>
      <Welcome />

      <Info />
    </UserLayout>
  )
}
