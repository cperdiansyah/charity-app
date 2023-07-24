'use client'
import { useState } from 'react'
import { Checkbox, Form, Input, Spin } from 'antd'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

import Navlink from '@/components/atoms/Navlink'
import CustomButton from '@/components/atoms/Button'

// Utils
import { NAVIGATION_LINK } from '@/utils/link'
import { notify } from '@/helpers/notify'
// styles
import styles from './forgot-password.module.scss'
import useUserData from '@/stores/userData'
import {
  checkAccountService,
  loginService,
  resetPasswordService,
} from '@/services/auth'
import {
  IErrorResponse,
  ISubmitLoginForm,
} from '@/services/auth/index.interface'

const ForgotPasswordForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [, setUserData] = useUserData()
  const [loading, setLoading] = useState<boolean>(false)

  const [forgotPage, setForgotPage] = useState<
    'account-check' | 'fill-new-password' | 'done'
  >('account-check')

  const handleAccountCheck = async (values: any) => {
    setLoading(true)

    try {
      await checkAccountService(values)
      notify('success', 'Account Valid', ``, 'bottomRight')
      setForgotPage('fill-new-password')
      setEmail(values.email)

      setLoading(false)
    } catch (error) {
      const resError: IErrorResponse = _.get(error, 'error', {
        code: 400,
        message: '',
      })
      notify('error', resError.message, '', 'bottomRight')
      setLoading(false)
    }
  }
  const handleResetPassword = async (values: any) => {
    setLoading(true)
    console.log(values)

    try {
      await resetPasswordService({ ...values, email })
      notify('success', 'Password was successfully reset', ``, 'bottomRight')
      setForgotPage('fill-new-password')
      setTimeout(() => {
        setLoading(false)
        return router.replace(NAVIGATION_LINK.Login)
      }, 500)
      setLoading(false)
    } catch (error) {
      const resError: IErrorResponse = _.get(error, 'error', {
        code: 400,
        message: '',
      })
      notify('error', resError.message, '', 'bottomRight')
      setLoading(false)
    }
  }

  return (
    <div className={` ${styles['login-container']}`}>
      <div
        className={`h-auto w-full max-w-lg rounded-md bg-white px-4 py-6  ${styles['card']}`}
      >
        <Spin spinning={loading}>
          <div className="mb-6 flex items-center gap-x-2">
            <div className="h-12 w-12 rounded-md bg-indigo-600 p-2">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124558.png" />
            </div>
            <h1 className="text-2xl font-bold text-gray-700">
              Getting in Trouble ?
            </h1>
          </div>

          {forgotPage === 'account-check' && (
            <FormAccountCheck form={form} handleSubmit={handleAccountCheck} />
          )}
          {forgotPage === 'fill-new-password' && (
            <FormFillPassword form={form} handleSubmit={handleResetPassword} />
          )}

          <div className="w-full text-center text-sm text-gray-600">
            Don't have an account?
            <Navlink
              className="text-medium ml-1 text-indigo-600 hover:underline"
              href={NAVIGATION_LINK.Signup}
              text="Sign Up"
            />
          </div>
          {/* </Form> */}
        </Spin>
      </div>
    </div>
  )
}

interface IFormAccountCheck {
  form: any
  handleSubmit: any
}

const FormAccountCheck = (props: IFormAccountCheck) => {
  return (
    <Form
      form={props.form}
      className="space-y-6"
      onFinish={props.handleSubmit}
      layout="vertical"
      labelWrap={false}
    >
      <div className="form-item-wrapper">
        <Form.Item
          label="Email/Username"
          name="email"
          className={`antd-form-item ${styles['antd-form-item']}`}
          rules={[
            {
              required: true,
              message: 'Please input your email/username!',
            },
          ]}
        >
          <Input placeholder="input your Email/Username" />
        </Form.Item>
        <CustomButton
          buttontype="primary"
          className="w-full !rounded-md font-semibold uppercase"
          htmlType="submit"
        >
          Check Account
        </CustomButton>
      </div>
    </Form>
  )
}
const FormFillPassword = (props: IFormAccountCheck) => {
  return (
    <Form
      form={props.form}
      className="space-y-6"
      onFinish={props.handleSubmit}
      layout="vertical"
      labelWrap={false}
    >
      <div className="form-item-wrapper">
        <Form.Item
          label="New Password"
          name="password"
          className={`antd-form-item ${styles['antd-form-item']}`}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" placeholder="input your Password" />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirm-password"
          dependencies={['password']}
          className={`antd-form-item ${styles['antd-form-item']}`}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              },
            }),
          ]}
        >
          <Input type="password" placeholder="input confirm Password" />
        </Form.Item>
        <CustomButton
          buttontype="primary"
          className="w-full !rounded-md font-semibold uppercase"
          htmlType="submit"
        >
          Reset Password
        </CustomButton>
      </div>
    </Form>
  )
}

export default ForgotPasswordForm
