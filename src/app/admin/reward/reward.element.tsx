'use client'
import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Spin,
  Switch,
  message,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import React, { useEffect, useState } from 'react'
// import _, { debounce } from 'lodash'
import debounce from 'lodash/debounce'

import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { notify } from '@/helpers/notify'
import { disabledDate, dateFormat } from '@/utils/date'
import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import { NAVIGATION_LINK } from '@/utils/link'

import CustomButton from '@/components/atoms/Button'
import {
  IFormAddBanner,
  IFormBanner,
  initialValue,
  mediaContentSource,
} from './reward.interface'
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload'

const { RangePicker } = DatePicker

const normFile = (e: any) => {
  // console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

export const FormAddReward = (props: IFormAddBanner) => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handlSubmit: any = async (values: any) => {
    setLoading(true)
    try {
      const dataBanner = {
        title: values.title,
        start_date: dayjs(values.dateBanner[0]),
        end_date: dayjs(values.dateBanner[1]),
        redirection_link: values.redirection_link,
        status: values.status ? 'active' : 'inactive',
        image: values?.media?.media_content,
      }

      const dataReward = {
        name: values.name,
        price: values.name,
        image: values?.media?.media_content,
      }
      // await api.post(SERVICE.createBanner, dataBanner)
      await api.post(`${SERVICE.Reward}/create`, dataReward)
      notify(
        'success',
        'Add Banner Successful',
        'banner created successfully',
        'bottomRight'
      )
      setTimeout(() => {
        return router.replace(NAVIGATION_LINK.BannerList)
      }, 500)
    } catch (error: any) {
      console.error(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse?.data?.error?.error?.message || '',
        'bottomRight'
      )
      setLoading(false)
    }
  }

  return (
    <FormReward
      form={form}
      loading={loading}
      onFinish={handlSubmit}
      buttonSubmitText="Save"
    />
  )
}

export const FormEditBanner = (props: IFormAddBanner) => {
  const [form] = Form.useForm()
  const router = useRouter()
  const params = useParams()
  const { id: idBanner } = params

  const [loading, setLoading] = useState(false)
  const [bannerValue, setBannerValue] = useState<initialValue>()

  useEffect(() => {
    getBannerData()
  }, [])

  const getBannerData = async () => {
    setLoading(true)
    try {
      const resBanner = await api.get(`${SERVICE.banner}/${idBanner}`)
      const dataBanner = resBanner.data.banner

      const initialValue = {
        title: dataBanner?.title,
        status: dataBanner?.status === 'active' ? true : false,
        redirection_link: dataBanner?.redirection_link,
        media: {
          media_content: dataBanner?.image,
        },
        dateBanner: [
          dayjs(dataBanner?.start_date),
          dayjs(dataBanner?.end_date),
        ],
      }
      setBannerValue(initialValue)

      setLoading(false)
    } catch (error: any) {
      console.error(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse?.data?.error?.error?.message || '',
        'bottomRight'
      )
      setLoading(false)
    }
  }

  const handlSubmit: any = async (values: any) => {
    setLoading(true)
    try {
      const dataBanner = {
        title: values.title,
        start_date: dayjs(values.dateBanner[0]),
        end_date: dayjs(values.dateBanner[1]),
        redirection_link: values.redirection_link,
        status: values.status ? 'active' : 'inactive',
        image: values?.media?.media_content,
      }

      await api.patch(`${SERVICE.banner}/${idBanner}`, dataBanner)
      notify(
        'success',
        'Update Banner Successful',
        'banner updated successfully',
        'bottomRight'
      )
      setTimeout(() => {
        return router.replace(NAVIGATION_LINK.BannerList)
      }, 500)
    } catch (error: any) {
      console.error(error)
      const errorResponse = error.response
      notify(
        'error',
        'Something went wrong',
        errorResponse?.data?.error?.error?.message || '',
        'bottomRight'
      )
      setLoading(false)
    }
  }

  return (
    <FormReward
      form={form}
      loading={loading}
      onFinish={handlSubmit}
      buttonSubmitText="Update"
      initialValue={bannerValue}
    />
  )
}

export const FormReward = (props: IFormBanner) => {
  const [mediaContentSource, setMediaContentSource] =
    useState<mediaContentSource>('url')
  const [loading, setLoading] = useState(false)

  const [imageUrl, setImageUrl] = useState('')

  const [uploadFileUrl, setUploadFileUrl] = useState([])
  // const uploadFileUrl = useRef([''])

  const [fileList, setFileList] = useState<UploadFile[]>()

  console.log(uploadFileUrl)

  useEffect(() => {
    if (props.initialValue) {
      props.form.setFieldsValue(props.initialValue)
      setImageUrl(props.initialValue.media.media_content)
    }
  }, [props.initialValue])

  const handleImageUrl = debounce((event) => {
    setImageUrl(event.target.value)
  }, 2000)

  const radioChange = (e: RadioChangeEvent) => {
    setMediaContentSource(e.target.value)
  }

  /* Upload media */
  // unused code but can be need in the future

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
        setUploadFileUrl(fileUrl)

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
    <div className="form-add-banner-container">
      <Spin spinning={props.loading}>
        <Form
          form={props.form}
          onFinish={props.onFinish}
          scrollToFirstError
          layout="vertical"
          initialValues={props.initialValue}
        >
          <Row gutter={24}>
            {/* Banner Content */}
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: 'Name is required' },
                  { type: 'string', min: 6 },
                ]}
              >
                <Input placeholder="input Name Reward" />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price Reward"
                rules={[
                  {
                    required: true,
                    message: 'Price link is required',
                  },
                ]}
              >
                <InputNumber
                  placeholder="input Price Reward"
                  formatter={(value: any) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            {/* Image */}
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
                  <Radio value={'upload'}>
                    {/* <Radio value={'upload'} disabled> */}
                    Upload
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.List name="media">
                {(fields, { add, remove }, { errors }) => {
                  const mediaSources = props.form.getFieldValue('media_source')
                  if (mediaSources === 'url') {
                    return (
                      <>
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
                          <Input
                            placeholder="https://example.com/media.jpeg"
                            onChange={handleImageUrl}
                          />
                        </Form.Item>
                        <Form.Item
                          name="media_content_preview"
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.media_content !== curValues.media_content
                          }
                        >
                          <Image
                            width={300}
                            src={
                              imageUrl ||
                              'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
                            }
                          />
                        </Form.Item>
                      </>
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
                          maxCount={1}
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
            <Form.Item name="submit">
              <CustomButton
                htmlType="submit"
                buttontype="primary"
                className="mt-2 !rounded-lg"
              >
                {props.buttonSubmitText || 'Save'}
              </CustomButton>
            </Form.Item>
          </Row>
        </Form>
      </Spin>
    </div>
  )
}
