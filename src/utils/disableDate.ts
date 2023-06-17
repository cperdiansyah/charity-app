import { RangePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"

/* Disabled date  for datepicker andtd */
export const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current <= dayjs().subtract(1, 'days')
}

/* Disabled date for datepicker andtd */
export const disabledCurrentDate: RangePickerProps['disabledDate'] = (
  current
) => {
  return current && current < dayjs().endOf('day')
}
