'use client'
import React, { useEffect, useState } from 'react'
import { AuditOutlined } from '@ant-design/icons'
import { Alert, Form, Modal, Spin } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'

import CustomButton from '@/components/atoms/Button'
import useUserData from '@/stores/userData'
import { SERVICE } from '@/utils/api'
import { api } from '@/utils/clientSideFetch'
import { IErrorResponse } from '@/services/auth/index.interface'
import { notify } from '@/helpers/notify'
import useTextEditor from '@/stores/textEditor'
import QuilEditor from '@/components/molecules/QuilEditor'
import Title from 'antd/es/typography/Title'
import useUpdated from '@/hooks/useUpdated'

interface IApprovalUser {
  className: string
}

export interface IApprovalDataUser {
  userVerified: boolean
  approvalData: null | ApprovalData
  userApprovalData: any
}

export interface ApprovalData {
  _id: string
  status: string
  approval_type: string
  foreign_id: string
  refModel: string
  createdAt: string
  updatedAt: string
  __v: number
  foreign_data: ForeignData
}

export interface ForeignData {
  _id: string
  name: string
  username: string
  email: string
  role: string
  is_verified: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

const ApprovalUser = (props: IApprovalUser) => {
  const [form] = Form.useForm()

  const [userData, setUserData] = useUserData()
  const [editorValue, setEditorValue] = useTextEditor()
  const [errorEditor, setErrorEditor] = useState(false)

  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [approvalData, setApprovalData] = useState<IApprovalDataUser>({
    userVerified: false,
    approvalData: null,
    userApprovalData: null,
  })

  const editorEmptyLogic =
    editorValue.length === 0 ||
    editorValue === '<p><br></p>' ||
    editorValue === '<p></p>'

  useEffect(() => {
    handleResetForm()
  }, [])

  useEffect(() => {
    if (errorEditor) {
      if (!editorEmptyLogic) {
        setErrorEditor(false)
      }
    }
  }, [editorValue.length])

  useEffect(() => {
    if (userData?.is_verified === false) {
      getApprovalUser()
    }
  }, [userData.id])

  useUpdated(() => {
    if (!_isEmpty(approvalData.userApprovalData) && isModalOpen) {
      setEditorValue(approvalData.userApprovalData.description)
    }
  }, [isModalOpen])

  /* Fetching Data */
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
          approvalData: !_isEmpty(dataApproval) ? dataApproval.data : null,
          userApprovalData: !_isEmpty(dataApprovalUser)
            ? dataApprovalUser
            : null,
        }))
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  /* Modal Function */
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  /* Submit Function */

  const handleSubmitRequest = async (values: any) => {
    setLoadingSubmit(true)
    try {
      const dataSubmitRequest = {
        user_id: userData.id,
        approval_id: approvalData.approvalData?._id,
        description: editorValue,
      }
      let resApprovalUser: any
      if (_isEmpty(approvalData.userApprovalData)) {
        resApprovalUser = await api.post(
          `${SERVICE.ApprovalUser}/create`,
          dataSubmitRequest
        )
      } else {
        resApprovalUser = await api.patch(
          `${SERVICE.ApprovalUser}/update/${approvalData.userApprovalData._id}`,
          dataSubmitRequest
        )
      }

      setApprovalData((user: any) => ({
        ...user,
        userApprovalData: resApprovalUser?.data.content,
      }))

      handleReset()
      handleResetForm()
      setLoadingSubmit(false)

      const titleNoiify = _isEmpty(approvalData.userApprovalData)
        ? 'Permintaan Permohonan Pembuatan Campaign Berhasil'
        : 'Update Permohonan Pembuatan Campaign Berhasil'
      notify(
        'success',
        titleNoiify,
        'mohon ditunggu reviewnya oleh admin',
        'bottomRight'
      )
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

  /* Form Function */
  const handleReset = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  const handleResetForm = () => {
    setEditorValue('')
    form.resetFields()
  }

  const checkEditorValue = () => {
    if (editorEmptyLogic) {
      setErrorEditor(true)
    }
  }

  const userNotRequestCampaign =
    !approvalData.userVerified &&
    approvalData?.approvalData?.status === 'pending' &&
    approvalData.userApprovalData === null
  const userRequestCampaignButNotApprovedYet =
    !approvalData.userVerified &&
    approvalData?.approvalData?.status === 'pending' &&
    approvalData.userApprovalData !== null
  return (
    <div className={`${[props.className].join(' ')}`}>
      <Spin tip="Loading" size="small" spinning={loading}>
        {userData?.is_verified === false && (
          <>
            {!_isEmpty(userData?.id) && userData?.id !== '' && (
              <CustomButton
                buttontype="primary"
                className={`btn btn-primary btn-block mx-auto mb-5  rounded-lg !px-4 !py-3 text-base`}
                disabled={loading}
                onClick={showModal}
              >
                <AuditOutlined />
                {userNotRequestCampaign
                  ? 'Mau Coba Buat Campaign ?'
                  : userRequestCampaignButNotApprovedYet &&
                    'Permintaan Anda sedang ditinjau, harap tunggu'}
              </CustomButton>
            )}

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
                  onFinishFailed={checkEditorValue}
                >
                  <Spin tip="Loading" size="small" spinning={loadingSubmit}>
                    <Form.Item>
                      <Title level={5}>Alasan Pengajuan</Title>
                      <QuilEditor placeholder="Beri kami alasan mengapa Anda ingin membuat  campaign" />
                      {errorEditor && (
                        <Alert message="Text Editor is Required" type="error" />
                      )}
                    </Form.Item>
                  </Spin>

                  <Form.Item>
                    <CustomButton
                      buttontype="primary"
                      className="btn btn-primary btn-block mx-auto mb-5  rounded-lg !px-4 !py-3 text-base"
                      htmlType="submit"
                      loading={loadingSubmit}
                    >
                      {userNotRequestCampaign
                        ? 'Kirim Pengajuan Pembuatan Camapaign'
                        : userRequestCampaignButNotApprovedYet &&
                          'Update Pengajuan Pembuatan Camapaign'}
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
