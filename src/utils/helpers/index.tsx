import useScreenWidth from 'hooks/useScreenWidth'

export const sidebarWidth = () => {
  // const router = useRouter()
  const screenWidth = useScreenWidth()

  if (screenWidth > 0 && screenWidth < 700) return Math.floor(screenWidth * 0.4)
  return undefined
}
