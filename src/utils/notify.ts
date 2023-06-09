import { notification } from 'antd'

import type { NotificationPlacement } from 'antd/es/notification/interface'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const notify = (
  type: NotificationType,
  title: string,
  message?: string,
  placement: NotificationPlacement = 'topRight',
  duration?: number
) => {
  return notification[type]({
    message: title ?? 'Something went wrong',
    description: message,
    placement,
    duration,
  })
}
