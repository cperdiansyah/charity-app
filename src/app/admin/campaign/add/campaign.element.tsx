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
  Radio,
  RadioChangeEvent,
  Row,
  Upload,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

/* Component */
import CustomButton from 'components/atoms/Button'
import QuilEditor from 'components/molecules/QuilEditor'
import useTextEditor from 'stores/textEditor'
import { disabledDate } from 'utils/disableDate'

const { RangePicker } = DatePicker

type mediaContentSource = 'url' | 'upload'

const FormAddCharity = () => {
  const [form] = Form.useForm()
  const [editorValue, setEditorValue] = useTextEditor()
  const [errorEditor, setErrotEditor] = useState(false)
  const [mediaContentSource, setMediaContentSource] =
    useState<mediaContentSource>('url')
  const [draftChecked, setDraftChecked] = useState(false)

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
    console.log(values)
    checkEditorValue()
  }
  const checkOnFailed = () => {
    checkEditorValue()
  }

  const checkEditorValue = () => {
    if (editorEmptyLogic) {
      setErrotEditor(true)
    }
  }

  const radioChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setMediaContentSource(e.target.value)
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const mediaFormUrl = <Input placeholder="https://example.com/media.jpeg" />
  const mediaFormUpload = (
    <Form.Item>
      <Form.Item
        name="dragger"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        noStyle
      >
        <Upload.Dragger
          name="files"
          action="/upload.do"
          accept="image/*,video/*"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
  )

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
          {/* Content Campaign */}
          <Col span={12}>
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

          {/* Image Campaign */}
          <Col span={12}>
            <p className="text-left text-lg font-medium">Media</p>
            <Form.Item
              name="media_source"
              label="Sources"
              rules={[{ required: true, message: 'Media Sources is required' }]}
              initialValue={mediaContentSource}
            >
              <Radio.Group
                onChange={radioChange}
                value={mediaContentSource}
                defaultValue={mediaContentSource}
              >
                <Radio value={'url'}>Url</Radio>
                <Radio value={'upload'}>Upload</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="media_content"
              shouldUpdate={(prevValues, curValues) =>
                prevValues.media_source !== curValues.media_source
              }
            >
              {form.getFieldValue('media_source') === 'url'
                ? mediaFormUrl
                : mediaFormUpload}
            </Form.Item>
          </Col>
          <Col span={24}>
            <QuilEditor placeholder="Input your content here" />
            {errorEditor && (
              <Alert message="Text Editor is Required" type="error" />
            )}
          </Col>
          <Col span={14}>
            <Form.Item
              name="draft"
              valuePropName="checked"
              className="my-3"
              initialValue={draftChecked}
            >
              <Checkbox
                defaultChecked={false}
                checked={draftChecked}
                onClick={() => setDraftChecked(!draftChecked)}
              >
                Draft
              </Checkbox>
            </Form.Item>
            <Form.Item name="submit">
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
