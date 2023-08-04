'use client'
import React, { useEffect, useState } from 'react'
import { Form, Spin, Switch } from 'antd'
import _isEmpty from 'lodash/isEmpty'

import { api } from '@/utils/clientSideFetch'
import { SERVICE } from '@/utils/api'
import CustomButton from '@/components/atoms/Button'
import { notify } from '@/helpers/notify'
import useUpdated from '@/hooks/useUpdated'

const ConfigPage = () => {
  const [form] = Form.useForm()

  const [dataConfig, setDataConfig] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  useEffect(() => {
    getConfig()

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useUpdated(() => {
    if (dataConfig?.sedekahSubuhEnable !== undefined) {
      form.setFieldValue('sedekahSubuhEnable', dataConfig?.sedekahSubuhEnable)
    }
  }, [dataConfig])

  const getConfig = async () => {
    try {
      const resConfig = await api.get(`${SERVICE.Config}`)
      setDataConfig((state: any) => resConfig.data.config)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitConfig = async (values: any) => {
    setLoadingSubmit((state) => true)
    try {
      await api.patch(`${SERVICE.Config}/update`, values)
      setLoadingSubmit((state) => false)
      notify('success', 'Config Updated', '', 'bottomRight')
    } catch (error) {
      console.log(error)
      // notify('error', resError.message, '', 'bottomRight')
      notify('error', 'Something went wrong', '', 'bottomRight')

      setLoadingSubmit((state) => false)
    }
  }

  return loading && _isEmpty(dataConfig) ? (
    <Spin size="large" />
  ) : (
    <Spin spinning={loadingSubmit}>
      <Form
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="vertical"
        form={form}
        onFinish={handleSubmitConfig}
        initialValues={{
          sedekahSubuhEnable: dataConfig?.sedekahSubuhEnable,
          sedekahSubuhCanRepeat: dataConfig?.sedekahSubuhCanRepeat,
        }}
      >
        <Form.Item
          label="Enable Sedekah Subuh"
          name="sedekahSubuhEnable"
          valuePropName="checked"
          className="text-2xl font-semibold"
        >
          <Switch
            className="bg-slate-300"
            defaultChecked={dataConfig?.sedekahSubuhEnable}
          />
        </Form.Item>
        <Form.Item
          label="Sedekah Subuh Can Repeat"
          name="sedekahSubuhCanRepeat"
          valuePropName="checked"
          className="text-2xl font-semibold"
        >
          <Switch
            className="bg-slate-300"
            defaultChecked={dataConfig?.sedekahSubuhCanRepeat}
          />
        </Form.Item>

        <Form.Item>
          <CustomButton
            htmlType="submit"
            buttontype="primary"
            className="mt-2 !rounded-lg !px-3 !py-2"
          >
            Save Config
          </CustomButton>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default ConfigPage
