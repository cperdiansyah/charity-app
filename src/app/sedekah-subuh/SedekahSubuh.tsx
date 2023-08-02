'use client'
import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { NAVIGATION_LINK } from '@/utils/link'
import { Form, InputNumber, Modal, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import _get from 'lodash/get'

import CustomButton from '@/components/atoms/Button'
import useUserData from '@/stores/userData'

import styles from './sedekah-subuh.module.scss'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import useMidtransSnap from '@/hooks/useMidtransSnap'
import { IErrorResponse } from '@/services/auth/index.interface'
import { notify } from '@/helpers/notify'

const SedekahSubuh = () => {
  const [form] = Form.useForm()
  const { token, setToken } = useMidtransSnap()

  const router = useRouter()

  const [userData, setUserData] = useUserData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataConfig, setDataConfig] = useState<any>({})
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const isEnableSedekahSubuh = useRef<boolean>(false)

  const now = dayjs()
  const hour = now.hour()

  /* Logic for detect client hour between 4 and 6 AM */
  if (hour >= 4 && hour < 6) {
    isEnableSedekahSubuh.current = true
  } else {
    isEnableSedekahSubuh.current = false
  }
  const isSedekahSubuhOpen =
    dataConfig.sedekahSubuhEnable || isEnableSedekahSubuh.current

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

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    if (!userData.id) {
      return router.replace(NAVIGATION_LINK.Login)
    }
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    // setIsModalOpen(false)
    handleReset()
  }
  const handleReset = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleSubmitDonation = async (values: any) => {
    setLoadingSubmit(true)
    console.log(values)
    try {
      handleReset()
      setLoadingSubmit(false)
    } catch (error) {
      const resError: IErrorResponse = _get(error, 'response.data.error', {
        code: 400,
        message: '',
      })
      setLoadingSubmit(false)
      console.log(error)

      notify(
        'error',
        'Something went wrong',
        resError?.message || '',
        'bottomRight'
      )
    }
  }
  return (
    <div className="mb-5 flex flex-col items-center justify-center">
      <CustomButton
        buttontype="primary"
        className={` btn btn-primary btn-block ${
          styles['sedekah-subuh-active']
        } ${
          !isSedekahSubuhOpen ? `${styles['sedekah-subuh-notactive']}` : ''
        } `}
        onClick={handleOpen}
        disabled={!isSedekahSubuhOpen}
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

      <Modal
        title="Input Donation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="z-auto"
        centered
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          name="donation-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmitDonation}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Donation"
            name="donation"
            shouldUpdate={(prevValues, curValues) =>
              prevValues.mediaSources !== curValues.mediaSources
            }
            style={{
              width: '100%',
            }}
            className="mb-3"
            initialValue={10000}
          >
            <InputNumber
              prefix="Rp."
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              style={{
                width: '100%',
              }}
              readOnly
            />
          </Form.Item>
          <Form.Item>
            <CustomButton
              buttontype="primary"
              className={`btn btn-primary btn-block ${styles['campaign-button']} `}
              htmlType="submit"
              loading={loadingSubmit}
            >
              Submit Sedekah Subuh
            </CustomButton>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SedekahSubuh
