'use client'
import { Button, Descriptions, Image, Modal, Spin, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import _get from 'lodash/get'
import {
  InfoCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

/* Component */
import CustomTable from '@/components/organisms/Table'

/* Utils */
import { currencyFormat } from '@/helpers'
import useUpdated from '@/hooks/useUpdated'
import { getApprovalBanner } from '@/services/moderation/clientService'
import { IModalTable } from '../../campaign/campaign.interfce'
import { CAMPAIGN_STATUS_WITH_COLORS } from '../../campaign/campaign'
import { notify } from '@/helpers/notify'
import { updateBannerStatus } from '@/services/banner/clientService'
const ModerationUser = () => {
  return <div>ModerationUser</div>
}

export default ModerationUser
