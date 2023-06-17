'use client'
import { Button, Col, Form, Input, Row } from 'antd'
import CustomButton from 'components/atoms/Button'
import QuilEditor from 'components/molecules/QuilEditor'
import React, { useEffect, useRef } from 'react'
import useTextEditor from 'stores/textEditor'

const FormAddCharity = () => {
  const [form] = Form.useForm()
  const [editorValue, setEditorValue] = useTextEditor()

  useEffect(() => {
    handleResetForm()
  }, [])

  const handleResetForm = () => {
    form.resetFields()
    setEditorValue('')
  }

  const handlSubmit = (values: any) => {
    console.log('Received values of form: ', values)
    console.log(editorValue)
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
          <Col span={24}>
            <QuilEditor />
          </Col>
        </Row>

        {/* <Button htmlType="submit">Simpan</Button> */}
        <CustomButton
          htmlType="submit"
          buttontype="primary"
          className="mt-2 !rounded-lg"
        >
          Simpan
        </CustomButton>
      </Form>
    </div>
  )
}

export { FormAddCharity }
