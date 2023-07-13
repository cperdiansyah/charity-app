import useScreenWidth from '@/hooks/useScreenWidth'
import dayjs from 'dayjs'

export const sidebarWidth = () => {
  // const router = useRouter()
  const screenWidth = useScreenWidth()

  if (screenWidth > 0 && screenWidth < 700) return Math.floor(screenWidth * 0.4)
  return undefined
}

export const currencyFormat = (money: number) => {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(money)
}

export const removeAdminPath = (path: string) => {
  const adminRegex = /^\/admin\/(.*)$/
  const match = path.match(adminRegex)

  return match ? '/' + match[1] : path
}

export function calculateDaysRemaining(date_end: Date | string) {
  const currentDay = dayjs()
  const campaignDate = dayjs(date_end)

  const diffDays = campaignDate.diff(currentDay, 'days')
  return diffDays
}

export function calculateFunded(pledged: number, target: number) {
  return Math.round((1 / (target / pledged)) * 100)
}

export function calculateTotalAmount(campaignPayment: any) {
  let totalAmount = 0
  for (let i = 0; i < campaignPayment.length; i++) {
    const payment = campaignPayment[i]
    totalAmount += payment.amount
  }

  return totalAmount
}