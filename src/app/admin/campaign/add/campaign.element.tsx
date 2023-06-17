'use client'
import React, { useEffect, useState, useRef } from 'react'
import {
  Alert,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd'

/* Component */
import CustomButton from 'components/atoms/Button'
import QuilEditor from 'components/molecules/QuilEditor'
import useTextEditor from 'stores/textEditor'
import { disabledDate } from 'utils/disableDate'

const { RangePicker } = DatePicker

const FormAddCharity = () => {
  const [form] = Form.useForm()
  const [editorValue, setEditorValue] = useTextEditor()
  const [errorEditor, setErrotEditor] = useState(false)

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
        setErrotEditor(false)
      }
    }
  }, [editorValue.length])

  const handleResetForm = () => {
    form.resetFields()
    setEditorValue('')
  }

  const handlSubmit = (values: any) => {
    checkEditorValue()

    // console.log('Received values of form: ', values)
    // console.log(editorValue)
  }
  const checkOnFailed = () => {
    checkEditorValue()
  }

  const checkEditorValue = () => {
    if (editorEmptyLogic) {
      setErrotEditor(true)
    }
  }

  return (
    <div className="form-add-charity-container">
      <Form
        form={form}
        onFinish={handlSubmit}
        scrollToFirstError
        layout="vertical"
        onFinishFailed={checkOnFailed}
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
            <Form.Item
              name="target"
              label="Campaign Target"
              rules={[
                { required: true, message: 'Campaign Target is required' },
              ]}
            >
              <InputNumber
                prefix="Rp. "
                placeholder="input Campaign Target"
                formatter={(value: any) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                // width={120}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              name="dateCampaign"
              label="Date Campaign"
              rules={[{ required: true, message: 'Date Campaign is required' }]}
            >
              <RangePicker disabledDate={disabledDate} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <h1 className="text-center">test</h1>
          </Col>
          <Col span={24}>
            <QuilEditor placeholder="Input your content here" />
            {errorEditor && (
              <Alert message="Text Editor is Required" type="error" />
            )}
          </Col>
          <Col span={14}>
            <Form.Item name="remember" valuePropName="checked" className="my-3">
              <Checkbox defaultChecked={false}>Draft</Checkbox>
            </Form.Item>
            <Form.Item>
              <CustomButton
                htmlType="submit"
                buttontype="primary"
                className="mt-2 !rounded-lg"
              >
                Save
              </CustomButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export { FormAddCharity }
