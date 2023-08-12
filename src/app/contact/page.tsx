'use client'
import React, { useState } from 'react'
import { Form, Input, Spin } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'

import emailjs from '@emailjs/browser'

import styles from './contact.module.scss'
import Map from '@/components/molecules/Map'
import Navlink from '@/components/atoms/Navlink'
import UserTemplate from '@/components/templates/UserLayout'
import { notify } from '@/helpers/notify'
const { TextArea } = Input
const Contact = () => {
  // const [emailState,]
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmitForm = async (values: any) => {
    setLoading((state) => true)
    try {
      await emailjs.send(
        'service_abbqq0c',
        'template_3f89dln',
        {
          from_name: values.name,
          email: values.email,
          messages: values.message,
        },
        '7h4DRk-4-BCNgUHIi'
      )
      setLoading((state) => false)

      notify('success', 'Pesan Berhasil Terkirim', '', 'bottomRight')
    } catch (error) {
      console.log(error)
      setLoading((state) => false)

      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }

  return (
    <UserTemplate>
      <section
        className={`xs-banner-inner-section parallax-window ${styles['banner-contact']} `}
      >
        <div className="xs-black-overlay" />
        <div className="container">
          <div className="color-white xs-inner-banner-content">
            <h2>Contact</h2>
            <p>Berikan uluran tangan untuk beramal untuk sesama kita</p>
            <ul className="xs-breadcumb">
              <li className="badge badge-pill badge-primary">
                <Navlink href="/" className="color-white" text=" Home /" />
                Contact
              </li>
            </ul>
          </div>
        </div>
      </section>

      <main className="xs-main">
        {/* <!-- contact section --> */}
        <section className="xs-contact-section-v2">
          <div className="container">
            <div className="xs-contact-container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="xs-contact-form-wraper">
                    <h4>Hubungi Kami</h4>
                    <Spin spinning={loading}>
                      <Form
                        form={form}
                        onFinish={handleSubmitForm}
                        scrollToFirstError
                        layout="vertical"
                        className="xs-contact-form contact-form-v2"
                        id="xs-contact-form"
                      >
                        <Form.Item
                          name="name"
                          rules={[
                            { required: true, message: 'Name is required' },
                          ]}
                          className={`bg-transparent ${styles['form-item']}`}
                        >
                          <Input
                            placeholder="Enter Your Name....."
                            className="bg-transparent"
                            suffix={<UserOutlined />}
                          />
                        </Form.Item>
                        <Form.Item
                          name="email"
                          rules={[
                            { required: true, message: 'Mail is required' },
                          ]}
                          className={`bg-transparent ${styles['form-item']}`}
                        >
                          <Input
                            placeholder="Enter Your Email....."
                            className="bg-transparent"
                            suffix={<MailOutlined />}
                          />
                        </Form.Item>
                        <Form.Item
                          name="messages"
                          rules={[
                            { required: true, message: 'message is required' },
                          ]}
                          className={`bg-transparent ${styles['form-item-textarea']}`}
                        >
                          <TextArea
                            cols={30}
                            rows={10}
                            id="xs-message"
                            placeholder="Enter Your Text Here....."
                            // children={<EditOutlined />}
                          />
                        </Form.Item>

                        {/* <!-- .input-group END --> */}
                        <button
                          className="btn btn-primary text-primary bg-white"
                          type="submit"
                          id="xs-submit"
                        >
                          submit
                        </button>
                      </Form>
                    </Spin>
                    {/* </form> */}
                    {/* <!-- .xs-contact-form #xs-contact-form END --> */}
                  </div>
                  {/* <!-- .xs-contact-form-wraper END --> */}
                </div>
                <div className="col-lg-6">
                  <Map />
                </div>
              </div>
              {/* <!-- .row end --> */}
            </div>
            {/* <!-- .xs-contact-container END --> */}
          </div>
          {/* <!-- .container end --> */}
        </section>
        {/* <!-- End contact section --> */}
      </main>
    </UserTemplate>
  )
}

export default Contact
