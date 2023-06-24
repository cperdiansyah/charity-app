'use client'
import React, { useEffect, useState, useRef } from 'react'
import {
  Alert,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

/* Component */
import CustomButton from 'components/atoms/Button'
import QuilEditor from 'components/molecules/QuilEditor'
import useTextEditor from 'stores/textEditor'
import { disabledDate } from 'utils/disableDate'
import dayjs from 'dayjs'
import { api } from 'utils/clientSideFetch'
import { SERVICE } from 'utils/api'
import { useRouter } from 'next/navigation'
import { notify } from 'helpers/notify'
import { NAVIGATION_LINK } from 'utils/link'

const { RangePicker } = DatePicker

type mediaContentSource = 'url' | 'upload'
export interface ICharityMedia {
  content: string
  content_type: 'image' | 'video'
}

const normFile = (e: any) => {
  // console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const FormAddCharity = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [editorValue, setEditorValue] = useTextEditor()
  const [errorEditor, setErrotEditor] = useState(false)
  const [mediaContentSource, setMediaContentSource] =
    useState<mediaContentSource>('url')
  const [draftChecked, setDraftChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadFileUrl, setUploadFileUrl] = useState([])
  // const uploadFileUrl = useRef([''])

  const [fileList, setFileList] = useState<UploadFile[]>()

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
    setUploadFileUrl([])
  }

  const handlSubmit = async (values: any) => {
    checkEditorValue()

    // console.log(values)

    setLoading(true)
    try {
      let media: ICharityMedia[] | undefined

      if (values.media_source !== 'url') {
        // mediaUrl = await uploadFileWithUrl(uploadFileUrl)
      } else {
        media = [
          {
            content: values.media.media_content,
            content_type: 'image',
          },
        ]
      }

      const dataCharity = {
        title: values.title,
        description: editorValue,
        donation_target: values.target,
        start_date: dayjs(values.dateCampaign[0]),
        end_date: dayjs(values.dateCampaign[1]),
        is_draft: values.draft,
        media,
      }

      await api.post(SERVICE.charity, dataCharity)
      notify(
        'success',
        'Add Campaign Successful',
        'campaign created successfully, please wait for admin verification',
        'bottomRight'
      )
      setTimeout(() => {
        return router.replace(NAVIGATION_LINK.CampaignList)
      }, 500)
    } catch (error: any) {
      console.error(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse.data.error.error.message || '',
        'bottomRight'
      )
      setLoading(false)
    }
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
    setMediaContentSource(e.target.value)
  }

  const uploadImageRequest = (options?: any) => {
    setTimeout(async () => {
      const { onSuccess, onError, file, onProgress } = options
      try {
        const fmData = new FormData()
        const config = {
          headers: { 'content-type': 'multipart/form-data' },
        }
        fmData.append('media_source', file)

        const response = await api.post(SERVICE.uploadMediaTemp, fmData, config)
        const fileUrl: any = response.data.url

        // const newUrl = [...uploadFileUrl.current, fileUrl[0]]
        const newUrl: any = [...uploadFileUrl, ...fileUrl]
        // console.log(uploadFileUrl)
        // console.log(newUrl)

        // console.log(uploadFileUrl.length)
        if (uploadFileUrl.length === 0) {
          // uploadFileUrl = fileUrl
          setUploadFileUrl(fileUrl)
        } else {
          // uploadFileUrl.push(fileUrl[0])
          // uploadFileUrl.current = newUrl
          setUploadFileUrl(newUrl)
        }
        onSuccess('Ok')
      } catch (err) {
        console.log('Eroor: ', err)
        const error = new Error('Some error')
        return onError({ err })
      }
    }, 500)
  }

  const uploadFileWithUrl = async (urls: string[]) => {
    try {
      const res = await api.post(SERVICE.mediaUpload, {
        urls: urls,
      })
      const result = res.data

      return result.uploadedUrls
    } catch (error) {
      notify('error', 'Something went wrong', '', 'bottomRight')
    }
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList]

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2)

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setFileList(newFileList)
  }

  // const props: UploadProps = {
  //   name: 'files',
  //   // fileList: { fileList },
  //   // action="/upload.do"
  //   // accept: 'image/*,video/*',
  //   // customRequest: { uploadImageRequest },
  //   onChange: { handleChange },

  //   // name: 'file',
  //   // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   // headers: {
  //   //   authorization: 'authorization-text',
  //   // },
  //   // onChange(info) {
  //   //   if (info.file.status !== 'uploading') {
  //   //     console.log(info.file, info.fileList)
  //   //   }
  //   //   if (info.file.status === 'done') {
  //   //     message.success(`${info.file.name} file uploaded successfully`)
  //   //   } else if (info.file.status === 'error') {
  //   //     message.error(`${info.file.name} file upload failed.`)
  //   //   }
  //   // },
  // }
  return (
    <div className="form-add-charity-container">
      <Spin spinning={loading}>
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
                rules={[
                  { required: true, message: 'Date Campaign is required' },
                ]}
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
                rules={[
                  { required: true, message: 'Media Sources is required' },
                ]}
                initialValue={mediaContentSource}
              >
                <Radio.Group
                  onChange={radioChange}
                  value={mediaContentSource}
                  defaultValue={mediaContentSource}
                >
                  <Radio value={'url'}>Url</Radio>
                  <Radio value={'upload'} disabled>
                    Upload
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.List name="media">
                {(fields, { add, remove }, { errors }) => {
                  const mediaSources = form.getFieldValue('media_source')
                  if (mediaSources === 'url') {
                    return (
                      <Form.Item
                        name="media_content"
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.media_source !== curValues.media_source
                        }
                        rules={[
                          {
                            required: true,
                            message: 'Media Sources is required',
                          },

                          {
                            pattern: new RegExp(
                              /^\b((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)\.(?:jpg|jpeg|png|gif)\b/
                            ),
                            message:
                              'Invalid URL or format specified (jpeg|jpeg|png|gif)',
                          },
                        ]}
                      >
                        <Input placeholder="https://example.com/media.jpeg" />
                      </Form.Item>
                    )
                  }
                  return (
                    <Form.Item
                      name="media_content"
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.media_source !== curValues.media_source
                      }
                    >
                      <Form.Item
                        name="media_content_upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: 'Media Content is required',
                          },
                        ]}
                      >
                        <Upload.Dragger
                          accept="image/*,video/*"
                          customRequest={uploadImageRequest}
                          onChange={handleChange}
                          fileList={uploadFileUrl}
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
                }}
              </Form.List>
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
      </Spin>
    </div>
  )
}

export { FormAddCharity }
