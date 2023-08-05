'use client'
import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { Form, InputNumber, Modal, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'

import CustomButton from '@/components/atoms/Button'
import useUserData from '@/stores/userData'

import { NAVIGATION_LINK } from '@/utils/link'
import styles from './sedekah-subuh.module.scss'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import useMidtransSnap from '@/hooks/useMidtransSnap'
import { IErrorResponse } from '@/services/auth/index.interface'
import { notify } from '@/helpers/notify'
import useAuth from '@/hooks/useAuth'

const SedekahSubuh = () => {
  const [form] = Form.useForm()
  const { token, setToken } = useMidtransSnap()
  const userToken = useAuth()

  const router = useRouter()
  const isAuth = useRef<boolean>(false)

  if (_isEmpty(userToken)) {
    isAuth.current = false
  } else {
    isAuth.current = true
  }

  const [userData, setUserData] = useUserData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataConfig, setDataConfig] = useState<any>({})
  const [dataPaymentSedekahSubuh, setDataPaymentSedekahSubuh] = useState<any>()
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

  const isSedekahSubuhCanRepeat = dataConfig?.sedekahSubuhCanRepeat
  const isTodayHasSedekahSubuh =
    dataPaymentSedekahSubuh?.campaignPayment?.length > 0

  const repeatSedekahSubuh = isTodayHasSedekahSubuh
    ? isSedekahSubuhCanRepeat
    : true

  useEffect(() => {
    getConfig()

    // getSedekahSubuhCampaign()
  }, [])

  useEffect(() => {
    if (isAuth.current && userData.id) {
      getSedekahSubuhPayment()
    }
  }, [isAuth.current, userData.id])

  const getConfig = async () => {
    try {
      const resConfig = await api.get(`${SERVICE.Config}`)
      setDataConfig(resConfig.data.config)
    } catch (error) {
      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }

  const getSedekahSubuhPayment = async () => {
    try {
      const resSedekahSubuh = await api.get(
        `${SERVICE.Transaction}/sedekah-subuh/check/${userData.id}`
      )
      const dataSedekahSubuh = resSedekahSubuh.data
      setDataPaymentSedekahSubuh(dataSedekahSubuh)
    } catch (error) {
      console.log(error)
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }
  // console.log(dataPaymentSedekahSubuh)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleOpen = () => {
    if (!userData.id || !isAuth.current) {
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
      const userId = userData.id
      const donation = values.donation

      const transactionData = {
        user_id: userId,
        amount: donation,
      }
      const resCreateTransaction = await api.post(
        `${SERVICE.Transaction}/charge/sedekah-subuh`,
        transactionData
      )
      const dataCreateTransaction = resCreateTransaction.data.content
      const { redirect_url, token } = dataCreateTransaction?.response_midtrans
      // console.log(redirect_url)
      setToken(token)
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
    <div className="mb-5 flex flex-col items-center justify-center gap-3">
      <CustomButton
        buttontype="primary"
        className={` btn btn-primary btn-block ${
          styles['sedekah-subuh-active']
        } ${
          !isSedekahSubuhOpen || !repeatSedekahSubuh
            ? `${styles['sedekah-subuh-notactive']} cursor-not-allowed`
            : ''
        } `}
        onClick={handleOpen}
        disabled={!isSedekahSubuhOpen || !repeatSedekahSubuh}
      >
        {isTodayHasSedekahSubuh
          ? 'Anda Sudah Melakukan Sedekah Subuh Hari Ini'
          : 'Sedekah Subuh'}
      </CustomButton>
      {/* {!isSedekahSubuhOpen && ( */}
      <Tag color="processing" className="w-fit ">
        Sedekah Subuh Hanya Tersedia Pada Pukul 04.00 s/d 06.00
      </Tag>
      {/* )} */}
      {dataConfig.sedekahSubuhEnable && (
        <Tag color="green" className="w-fit text-sm capitalize">
          diaktifkan oleh konfigurasi di halaman admin
        </Tag>
      )}

      <Modal
        title="Form Sedekah Subuh"
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
          <Form.Item className="gap-3">
            {/* {!isSedekahSubuhOpen && ( */}
            <Tag color="processing" className="mb-3 w-fit">
              Sedekah Subuh Hanya Bisa Sekali Dalam Sehari
            </Tag>
            {/* )} */}
            {isSedekahSubuhCanRepeat && (
              <Tag
                color="green"
                className="w-fit whitespace-normal text-sm capitalize "
              >
                Sedekah subuh di set bisa dilakukan berulang kali oleh
                konfigurasi di halaman admin
              </Tag>
            )}
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
