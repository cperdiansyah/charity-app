'use client'
import React, { useState } from 'react'
import { Form, Input, Spin } from 'antd'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

import Navlink from '@/components/atoms/Navlink'
import CustomButton from '@/components/atoms/Button'

// Utils
import { NAVIGATION_LINK } from '@/utils/link'
import { notify } from '@/helpers/notify'
import { signupService } from '@/services/auth'
import {
  IErrorResponse,
  ISubmitSignupForm,
} from '@/services/auth/index.interface'

// styles
import styles from './signup.module.scss'
import useUserData from '@/stores/userData'

const SignupForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [, setUserData] = useUserData()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (values: ISubmitSignupForm): Promise<void> => {
    setLoading(true)
    try {
      const response = await signupService(values)
      if ('accessToken' in response) {
        setUserData({
          name: response.name,
          email: response.email,
          role: response.role,
          id: response?.id,
          is_verified: response.is_verified,
        })

        notify('success', 'Register successful', '', 'bottomRight')
        setTimeout(() => {
          return router.replace(NAVIGATION_LINK.Homepage)
        }, 500)
      }
    } catch (error) {
      setLoading(false)
      const resError: IErrorResponse = _.get(error, 'error', {
        code: 400,
        message: '',
      })
      const resErrorFeedback: IErrorResponse = _.get(error, '', {
        code: 400,
        message: '',
      })
      notify(
        'error',
        resError.message.length > 0
          ? resError.message
          : resErrorFeedback.message,
        '',
        'bottomRight'
      )
      setLoading(false)
    }
  }
  return (
    <div className={` ${styles['signup-container']}`}>
      <div
        className={`h-auto w-full max-w-lg rounded-md bg-white px-4 py-6  ${styles['card']}`}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            className="space-y-6"
            onFinish={handleSubmit}
            layout="vertical"
            labelWrap={false}
          >
            <div className="flex items-center gap-x-2">
              <div className="h-12 w-12 rounded-md bg-indigo-600 p-2">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124558.png" />
              </div>
              <h1 className="text-2xl font-bold text-gray-700">
                Baru disini ?
              </h1>
            </div>
            <div className="form-item-wrapper">
              <Form.Item
                label="name"
                name="name"
                className={`antd-form-item ${styles['antd-form-item']}`}
                rules={[
                  { required: true, message: 'Please input your name!' },
                  {
                    type: 'string',
                    min: 6,
                    message: 'Must be at least 6 characters',
                  },
                ]}
              >
                <Input placeholder="input your name" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                className={`antd-form-item ${styles['antd-form-item']}`}
                rules={[
                  { required: true, message: 'Please input your username!' },
                  {
                    type: 'string',
                    min: 5,
                    message: 'Must be at least 5 characters',
                  },
                ]}
              >
                <Input placeholder="input your Username" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className={`antd-form-item ${styles['antd-form-item']}`}
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'Please enter correct email address',
                  },
                ]}
              >
                <Input type="email" placeholder="input your Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className={`antd-form-item ${styles['antd-form-item']}`}
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input type="password" placeholder="input your Password" />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
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
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      )
                    },
                  }),
                ]}
              >
                <Input type="password" placeholder="input confirm Password" />
              </Form.Item>
            </div>
            <CustomButton
              buttontype="primary"
              className="w-full !rounded-md font-semibold uppercase"
              htmlType="submit"
            >
              Sign Up
            </CustomButton>

            <div className="w-full text-center text-sm text-gray-600">
              Sudah memiliki akun?
              <Navlink
                className="text-medium ml-1 text-indigo-600 hover:underline"
                href={NAVIGATION_LINK.Login}
                text="Login"
              />
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default SignupForm
