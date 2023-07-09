'use client'
// Import Swiper React components
import { useState, useEffect, Key } from 'react'
import { Pagination, Autoplay } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import BannerItem from '@/components/molecules/Banner'

import styles from './campaign.module.scss'

interface ISwiperList {
  className?: string
}

const SwiperBanner = (props: ISwiperList) => {
  const [banner, setBanner] = useState<[]>()

  useEffect(() => {
    getBanner()
  }, [])

  const getBanner = async () => {
    try {
      const dataBanner = await api.get(SERVICE.banner)
      const { banner } = dataBanner.data
      setBanner(banner)
      return dataBanner
    } catch (error) {
      setBanner([])
      console.log(error)
      return error
    }
  }
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className={` ${styles['swiper-banner']} ${[props.className].join(' ')}`}
    >
      {banner?.map((item: any, index: Key) => (
        <SwiperSlide key={index}>
          <BannerItem
            href={item.redirection_link}
            imgSrc={item.image}
            title={item.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperBanner
