'use client'
import React from 'react'
import { Checkbox, Form, Input } from 'antd'

import UserTemplate from 'components/templates/UserLayout'
import Navlink from 'components/atoms/Navlink'
import CustomButton from 'components/atoms/Button'

// Utils
import { NAVIGATION_LINK } from 'utils/link'

// styles
import styles from './signup.module.scss'

const Signup = () => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <UserTemplate>
      <div className={` ${styles['signup-container']}`}>
        <div
          className={`h-auto w-full max-w-lg rounded-md bg-white px-4 py-6  ${styles['card']}`}
        >
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
              <h1 className="text-2xl font-bold text-gray-700">New Here ?</h1>
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
                <Input placeholder="input confirm Password" />
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
              Already have an account?
              <Navlink
                className="text-medium ml-1 text-indigo-600 hover:underline"
                href={NAVIGATION_LINK.Login}
                text="Login"
              />
            </div>
          </Form>
        </div>
      </div>
    </UserTemplate>
  )
}

export default Signup
