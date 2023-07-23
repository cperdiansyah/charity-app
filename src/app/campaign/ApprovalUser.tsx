'use client'
import React, { useEffect, useState } from 'react'
import { AuditOutlined } from '@ant-design/icons'
import { Form, Modal, Spin } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

import CustomButton from '@/components/atoms/Button'
import useUserData from '@/stores/userData'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'
import { IErrorResponse } from '@/services/auth/index.interface'
import { notify } from '@/helpers/notify'

interface IApprovalUser {
  className: string
}

const ApprovalUser = (props: IApprovalUser) => {
  const [form] = Form.useForm()

  const [userData, setUserData] = useUserData()
  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [approvalData, setApprovalData] = useState({
    userVerified: false,
    status: 'pending',
    userApprovalData: null,
  })

  useEffect(() => {
    if (userData?.is_verified === false) {
      getApprovalUser()
    }
  }, [userData.id])

  const getApprovalUser = async () => {
    try {
      if (userData.id) {
        const resApproval = await api.get(
          `${SERVICE.Approval}/foreign/${userData.id}`
        )
        const dataApproval = resApproval.data

        const resApprovalUser = await api
          .get(`${SERVICE.ApprovalUser}/user/${userData.id}`)
          .then((user) => {
            return user.data
          })
          .catch((err) => {})
        const dataApprovalUser = resApprovalUser?.data

        setApprovalData((user: any) => ({
          ...user,
          userVerified: userData.is_verified,
          status: dataApproval.data.status,
          approvalData: !_isEmpty(dataApprovalUser) ? dataApprovalUser : null,
        }))
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSubmitRequest = async (values: any) => {
    setLoadingSubmit(true)
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
  const handleReset = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  console.log(approvalData)
  const userNotRequestCampaign =
    !approvalData.userVerified &&
    approvalData.status === 'pending' &&
    approvalData.userApprovalData === null
  const userRequestCampaignButNotApprovedYet =
    !approvalData.userVerified &&
    approvalData.status === 'pending' &&
    approvalData.userApprovalData !== null

  const title = userNotRequestCampaign
    ? 'Make a Campaign Request'
    : userRequestCampaignButNotApprovedYet &&
      'Your request is being reviewed, please wait'
  return (
    <div className={`${[props.className].join(' ')}`}>
      <Spin tip="Loading" size="small" spinning={loading}>
        {userData?.is_verified === false && (
          <>
            <CustomButton
              buttontype="primary"
              className={`btn btn-primary btn-block mx-auto mb-5  rounded-lg !px-4 !py-3 text-base`}
              disabled={loading}
              onClick={showModal}
            >
              <AuditOutlined />
              {userNotRequestCampaign
                ? 'Make a Campaign Request'
                : userRequestCampaignButNotApprovedYet &&
                  'Your request is being reviewed, please wait'}
            </CustomButton>

            {(userNotRequestCampaign ||
              userRequestCampaignButNotApprovedYet) && (
              <Modal
                title="Campaign Request"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="z-auto"
                // centered
                footer={null}
              >
                <Form
                  form={form}
                  name="donation-form"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmitRequest}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item>
                    <CustomButton
                      buttontype="primary"
                      className="btn btn-primary btn-block mx-auto mb-5  rounded-lg !px-4 !py-3 text-base"
                      htmlType="submit"
                      loading={loadingSubmit}
                    >
                      {userNotRequestCampaign
                        ? 'Submit Campaign Request'
                        : userRequestCampaignButNotApprovedYet &&
                          'Update Campaign Request'}
                    </CustomButton>
                  </Form.Item>
                </Form>
              </Modal>
            )}
          </>
        )}
      </Spin>
    </div>
  )
}

export default ApprovalUser
