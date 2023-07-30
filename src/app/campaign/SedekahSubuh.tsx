'use client'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { Tag } from 'antd'
import CustomButton from '@/components/atoms/Button'
import { NAVIGATION_LINK } from '@/utils/link'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'

const SedekahSubuh = () => {
  const isEnableSedekahSubuh = useRef<boolean>(false)

  const [dataConfig, setDataConfig] = useState<any>({})

  const now = dayjs()
  const hour = now.hour()

  /* Logic for detect client hour between 4 and 6 AM */
  if (hour >= 4 && hour < 6) {
    isEnableSedekahSubuh.current = true
  } else {
    isEnableSedekahSubuh.current = false
  }

  useEffect(() => {
    getConfig()
  }, [])

  const getConfig = async () => {
    try {
      const resConfig = await api.get(`${SERVICE.Config}`)
      setDataConfig(resConfig.data.config)
    } catch (error) {
      console.log(error)
    }
  }

  const isSedekahSubuhOpen =
    dataConfig.sedekahSubuhEnable || isEnableSedekahSubuh.current

  return (
    <div className="mb-5 flex flex-col items-center justify-center">
      <CustomButton
        buttontype="primary"
        className={`btn btn-primary btn-block mx-auto mb-3  w-fit rounded-lg !px-4 !py-3 text-base shadow-lg hover:!bg-primary-color hover:!text-white ${
          !isSedekahSubuhOpen
            ? 'opacity-80 grayscale-[30%] before:content-none after:content-none'
            : ''
        } `}
        href={isSedekahSubuhOpen ? `${NAVIGATION_LINK.SedekahSubuh}` : '#'}
      >
        Sedekah Subuh
      </CustomButton>
      {!isSedekahSubuhOpen && (
        <Tag color="processing" className="w-fit ">
          Sedekah Subuh Hanya Tersedia Pada Pukul 04.00 s/d 06.00
        </Tag>
      )}
      {dataConfig.sedekahSubuhEnable && (
        <Tag color="green" className="w-fit text-sm capitalize">
          diaktifkan oleh konfigurasi di halaman admin
        </Tag>
      )}
    </div>
  )
}

export default SedekahSubuh
