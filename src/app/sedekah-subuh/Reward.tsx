'use client'
import React, { useEffect, useState } from 'react'
import { Card, Col, Empty, Form, Modal, Row, Spin } from 'antd'
import styles from './sedekah-subuh.module.scss'
import CustomButton from '@/components/atoms/Button'
import { formatNumber } from './PoinInfo'
import useUpdated from '@/hooks/useUpdated'

const Reward = (props: {
  loading: boolean
  dataPoint: any
  dataReward?: any
  isModalOpen?: any
  setClickedReward?: any
  handleClick: VoidFunction
}) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen)

  useUpdated(() => {
    setIsModalOpen((state: boolean) => props.isModalOpen)
  }, [props.isModalOpen])

  const showModal = (reward: any) => {
    props.setClickedReward(reward)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto mb-5  ">
      <h3 className="h3 mb-3 text-center text-xl">Reward</h3>
      <div className="reward-list flex flex-col gap-3 md:flex-row">
        {props?.dataReward?.length === 0 ? (
          <Empty description="Reward Tidak Tersedia" className="mx-auto" />
        ) : (
          props?.dataReward?.map((reward: any) => {
            return (
              <>
                <RewardCard
                  image={reward?.image}
                  point={props.dataPoint?.value}
                  price={reward?.price}
                  title={reward?.name}
                  showModal={() => showModal(reward)}
                />
                <Modal
                  title="Yakin Ingin Menukarkan Point"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                  centered
                >
                  <Spin spinning={props?.loading}>
                    <Form onFinish={props.handleClick} className="mt-3">
                      <Row gutter={24}>
                        <Col span={12}>
                          <Form.Item>
                            <CustomButton
                              htmlType="button"
                              buttontype="primary"
                              // type="ghost"
                              onClick={handleCancel}
                              className="mt-2 !rounded-lg bg-white text-gray-500"
                            >
                              Tidak
                            </CustomButton>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="submit">
                            <CustomButton
                              htmlType="submit"
                              buttontype="primary"
                              className="mt-2 !rounded-lg"
                            >
                              Tukar Point
                            </CustomButton>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Spin>
                </Modal>
              </>
            )
          })
        )}
      </div>
    </div>
  )
}

interface IRewardCard {
  image?: string
  title: string
  point: number
  price: number
  // onClick: VoidFunction
  showModal: VoidFunction
}

const RewardCard = (props: IRewardCard) => {
  return (
    <Card className="mx-auto mb-3 w-full rounded-lg shadow-md md:w-1/2">
      <div className="card-wrapper flex flex-col  gap-4">
        <img
          src={
            props?.image ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
          }
          alt={props.title}
          className={` ${styles['reward-card-image']}`}
        />
        <h5 className="text-center text-lg font-semibold">{props.title}</h5>
        <CustomButton
          buttontype="primary"
          // className={`btn btn-primary btn-block ${styles['card-button']} `}
          className={` btn btn-primary btn-block ${
            styles['sedekah-subuh-active']
          } ${
            props.price > (props?.point || 0)
              ? `${styles['sedekah-subuh-notactive']} cursor-not-allowed`
              : ''
          } `}
          // href="#popularcause"
          // href={`${NAVIGATION_LINK.Campaign}/${slug}`}
          disabled={props.price > (props?.point || 0)}
          onClick={props.showModal}
        >
          Tukarkan {formatNumber(props.price)} Point
        </CustomButton>
      </div>
    </Card>
  )
}

export default Reward
