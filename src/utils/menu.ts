import {
  DesktopOutlined,
  DeploymentUnitOutlined,
  PictureOutlined,
  AuditOutlined,
  PrinterOutlined,
} from '@ant-design/icons'
import { NAVIGATION_LINK } from 'utils/link'

export const SidebarMenu = {
  dashboard: {
    label: 'Dashboard',
    icon: DesktopOutlined,
    pathname: NAVIGATION_LINK.Dashboard,
  },
  charity: {
    label: 'Charity',
    icon: DeploymentUnitOutlined,
    pathname: NAVIGATION_LINK.CharityList,
  },
  banner: {
    label: 'Banner',
    icon: PictureOutlined,
  },
  contentModeration: {
    label: 'Content Moderation',
    icon: AuditOutlined,
    children: [{ label: 'Charity' }, { label: 'User' }],
  },
  report: {
    label: 'Report',
    icon: PrinterOutlined,
    children: [{ label: 'Charity' }, { label: 'User' }],
  },
}

export const adminSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.banner,
  SidebarMenu.contentModeration,
  SidebarMenu.report,
]

export const userVerfiedSidebar = [
  SidebarMenu.dashboard,
  SidebarMenu.charity,
  SidebarMenu.report,
]


