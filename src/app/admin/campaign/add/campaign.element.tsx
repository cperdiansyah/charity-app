'use client'
import { Col, Form, Row } from 'antd'
import React from 'react'

const FormAddCharity = () => {
  const [form] = Form.useForm()
  const handlSubmit = (values: any) => {
    console.log('Received values of form: ', values)
  }
  return (
    <div className="form-add-charity-container">
      <Form form={form} onFinish={handlSubmit} scrollToFirstError>
        <Row gutter={24}>{/* {getFields()} */}
          <Col>
           </Col>
        </Row>
      </Form>
    </div>
  )
}

export { FormAddCharity }
