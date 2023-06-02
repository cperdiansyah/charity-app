import { redirect } from 'next/navigation'
import { NAVIGATION_LINK } from 'utils/link'

const AdminIndex = () => {
  redirect(NAVIGATION_LINK.Dashboard)
}

export default AdminIndex
