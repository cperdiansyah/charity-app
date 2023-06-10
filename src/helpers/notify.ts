import { notification } from 'antd'

import type { NotificationPlacement } from 'antd/es/notification/interface'
import { toCapitalize } from './capitalize'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const notify = (
  type: NotificationType,
  title: string,
  message?: string,
  placement: NotificationPlacement = 'topRight',
  duration?: number
) => {
  return notification[type]({
    message: title ? toCapitalize(title) : 'Something Went Wrong',
    description: message,
    placement,
    duration,
  })
}
