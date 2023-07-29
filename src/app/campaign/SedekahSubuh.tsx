'use client'
import React, { useRef } from 'react'
import dayjs from 'dayjs'
import CustomButton from '@/components/atoms/Button'
import { NAVIGATION_LINK } from '@/utils/link'

const SedekahSubuh = () => {
  const isEnableSedekahSubuh = useRef<boolean>(false)
  // const isEnableSedekahSubuh = useRef<boolean>(false)

  const now = dayjs()
  const hour = now.hour()

  /* Logic for detect client hour between 4 and 6 AM */
  // if (hour >= 4 && hour < 6) {
  //   isEnableSedekahSubuh.current = true
  // } else {
  //   isEnableSedekahSubuh.current = false
  // }

  return (
    <CustomButton
      buttontype="primary"
      className={`btn btn-primary btn-block mx-auto mb-5 w-fit rounded-lg !px-4 !py-3 text-base shadow-lg hover:!bg-primary-color hover:!text-white ${
        !isEnableSedekahSubuh.current
          ? 'opacity-80 grayscale-[30%] before:content-none after:content-none'
          : ''
      } `}
      href={
        isEnableSedekahSubuh.current ? `${NAVIGATION_LINK.SedekahSubuh}` : '#'
      }
    >
      Sedekah Subuh
    </CustomButton>
  )
}

export default SedekahSubuh
