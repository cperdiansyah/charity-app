import useScreenWidth from 'hooks/useScreenWidth'

export const sidebarWidth = () => {
  // const router = useRouter()
  const screenWidth = useScreenWidth()

  if (screenWidth > 0 && screenWidth < 700) return Math.floor(screenWidth * 0.4)
  return undefined
}

export const currencyFormat = (money: number) => {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(money)
}


export const removeAdminPath = (path: string) => {
  const adminRegex = /^\/admin\/(.*)$/
  const match = path.match(adminRegex)

  return match ? '/' + match[1] : path
}