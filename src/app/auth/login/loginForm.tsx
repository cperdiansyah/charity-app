'use client'
import { useState } from 'react'
import { Checkbox, Form, Input, Spin } from 'antd'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

import Navlink from 'components/atoms/Navlink'
import CustomButton from 'components/atoms/Button'

// Utils
import { NAVIGATION_LINK } from 'utils/link'
import { notify } from 'utils/notify'
// styles
import styles from './login.module.scss'
import useUserData from 'stores/userData'
import { loginService } from 'services/auth'
import { IErrorResponse, ISubmitLoginForm } from 'services/auth/index.interface'

const LoginForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [, setUserData] = useUserData()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (values: ISubmitLoginForm): Promise<void> => {
    setLoading(true)

    try {
      const response = await loginService(values)

      if ('accessToken' in response) {
        setUserData({
          name: response.name,
          email: response.email,
          role: response.role,
        })

        notify(
          'success',
          'Login successful',
          `You will be directed to the ${
            response.role === 'admin' ? 'Dashboard' : 'Homepage'
          }`,
          'bottomRight'
        )
        setTimeout(() => {
          if (response.role === 'admin')
            return router.replace(NAVIGATION_LINK.Dashboard)

          return router.replace(NAVIGATION_LINK.Homepage)
        }, 500)
      }
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
              <h1 className="text-2xl font-bold text-gray-700">Welcome Back</h1>
            </div>
            <div className="form-item-wrapper">
              <Form.Item
                label="Email/Username"
                name="username"
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
            </div>
            <div className="flex justify-between">
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
                className={`${styles['checkbox-remember']}`}
              >
                <Checkbox className="h-4 w-4 rounded-md  bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Navlink
                className="text-xs font-semibold uppercase tracking-wider text-gray-500"
                href={NAVIGATION_LINK.ForgotPassword}
                text="Forgot Password"
              />
            </div>
            <CustomButton
              buttontype="primary"
              className="w-full !rounded-md font-semibold uppercase"
              htmlType="submit"
            >
              Login
            </CustomButton>

            <div className="w-full text-center text-sm text-gray-600">
              Don't have an account?
              <Navlink
                className="text-medium ml-1 text-indigo-600 hover:underline"
                href={NAVIGATION_LINK.Signup}
                text="Sign Up"
              />
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default LoginForm
