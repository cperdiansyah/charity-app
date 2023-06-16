'use client'
import { Col, Form, Input, Row } from 'antd'
import React, { useRef } from 'react'

const FormAddCharity = () => {
  const [form] = Form.useForm()
  const editorRef = useRef<any>(null)

  const handlSubmit = (values: any) => {
    console.log('Received values of form: ', values)

    if (editorRef.current) {
      // console.log(editorRef.current.getContent())
      console.log(editorRef.current)
    }
  }

  return (
    <div className="form-add-charity-container">
      <Form
        form={form}
        onFinish={handlSubmit}
        scrollToFirstError
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={14}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: 'Title is required' },
                { type: 'string', min: 6 },
              ]}
            >
              <Input placeholder="input Title Campaign" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <h1 className="text-center">test</h1>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export { FormAddCharity }
