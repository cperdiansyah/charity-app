import Header from 'components/organisms/Header'
import Info from 'components/organisms/Info'
import Welcome from 'components/organisms/Welcome'
import Image from 'next/image'

export default async function Home() {
  // const data = await getData()
  // console.log(data)
  return (
    <>
      <Welcome />

      <Info />
    </>
  )
}
