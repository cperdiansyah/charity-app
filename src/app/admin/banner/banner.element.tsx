'use client'
import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Spin,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
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
} from './banner.interface'

const { RangePicker } = DatePicker

const normFile = (e: any) => {
  // console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const uploadFileWithUrl = async (urls: string[]) => {
  console.log(urls)
  try {
    const res = await api.post(SERVICE.bannerUpload, {
      urls: urls,
    })
    const result = res.data

    return result.uploadedUrls
  } catch (error) {
    notify('error', 'Something went wrong', '', 'bottomRight')
  }
}

export const FormAddBanner = (props: IFormAddBanner) => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handlSubmit: any = async (values: any) => {
    setLoading(true)
    try {
      let media: string

      if (values.media_source !== 'url') {
        const url = form.getFieldValue('media_content_url')
        const mediaUrl = await uploadFileWithUrl([url])
        media = mediaUrl[0]
      } else {
        media = values?.media?.media_content
      }

      const dataBanner = {
        title: values.title,
        start_date: dayjs(values.dateBanner[0]),
        end_date: dayjs(values.dateBanner[1]),
        redirection_link: values.redirection_link,
        status: values.status ? 'active' : 'inactive',
        image: media,
      }
      await api.post(SERVICE.createBanner, dataBanner)
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
    <FormBanner
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
       let media: string

       if (values.media_source !== 'url') {
         const url = form.getFieldValue('media_content_url')
         const mediaUrl = await uploadFileWithUrl([url])
         media = mediaUrl[0]
       } else {
         media = values?.media?.media_content
       }
      const dataBanner = {
        title: values.title,
        start_date: dayjs(values.dateBanner[0]),
        end_date: dayjs(values.dateBanner[1]),
        redirection_link: values.redirection_link,
        status: values.status ? 'active' : 'inactive',
        image: media,
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
    <FormBanner
      form={form}
      loading={loading}
      onFinish={handlSubmit}
      buttonSubmitText="Update"
      initialValue={bannerValue}
    />
  )
}

export const FormBanner = (props: IFormBanner) => {
  const [mediaContentSource, setMediaContentSource] =
    useState<mediaContentSource>('url')

  const [imageUrl, setImageUrl] = useState('')
  const [uploadFileUrl, setUploadFileUrl] = useState([])
  const [fileList, setFileList] = useState<UploadFile[]>()

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
        props.form.setFieldValue('media_content_url', fileUrl)

        // // const newUrl = [...uploadFileUrl.current, fileUrl[0]]
        // const newUrl: any = [...uploadFileUrl, ...fileUrl]
        // // console.log(uploadFileUrl)
        // // console.log(newUrl)

        // // console.log(uploadFileUrl.length)
        // if (uploadFileUrl.length === 0) {
        //   // uploadFileUrl = fileUrl
        //   setUploadFileUrl(fileUrl)
        // } else {
        //   // uploadFileUrl.push(fileUrl[0])
        //   // uploadFileUrl.current = newUrl
        //   setUploadFileUrl(newUrl)
        // }

        let newFileList = fileList

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList?.slice(-2)

        // 2. Read from response and show file link
        newFileList = newFileList?.map((file) => {
          if (fileUrl) {
            // Component will show file.url as link
            file.url = fileUrl
          }
          return file
        })

        setFileList(newFileList)
        onSuccess('Ok')
      } catch (err) {
        console.log('Eroor: ', err)
        const error = new Error('Some error')
        return onError({ err })
      }
    }, 500)
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
                name="title"
                label="Title"
                rules={[
                  { required: true, message: 'Title is required' },
                  { type: 'string', min: 6 },
                ]}
              >
                <Input placeholder="input Title Banner" />
              </Form.Item>
              <Form.Item
                name="redirection_link"
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.media_source !== curValues.media_source
                }
                label="Redirection Link"
                rules={[
                  {
                    required: true,
                    message: 'Redirection link is required',
                  },

                  {
                    pattern: new RegExp(
                      /(https?:\/\/)?[a-zA-Z0-9-\.@:%_\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/
                    ),
                    message: 'Invalid URL',
                  },
                ]}
              >
                <Input placeholder="https://example.com/your-destiantion-page" />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Status is required' }]}
                initialValue={true}
              >
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  defaultChecked={true}
                />
              </Form.Item>
              <Form.Item
                name="dateBanner"
                label="Banner Duration"
                rules={[
                  { required: true, message: 'Banner Duration is required' },
                ]}
              >
                <RangePicker disabledDate={disabledDate} format={dateFormat} />
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
            <Form.Item name="media_content_url" label="Title" hidden>
              <Input placeholder="input Title Campaign" />
            </Form.Item>
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
